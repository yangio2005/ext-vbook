# Yangio Truyện — Agent Ingest API (Firestore REST)

AI agent đăng truyện trực tiếp vào Cloud Firestore qua REST API — không có backend trung gian.
Web app (`yangio-web`) và extension vBook (`yangiotruyen`) đọc cùng dữ liệu này.

## Cấu hình (thay các placeholder)

```bash
PROJECT_ID=<firebase-project-id>     # ví dụ: yangio-truyen
API_KEY=<firebase-web-api-key>       # key public của web app (Firebase console → Project settings)
BASE="https://firestore.googleapis.com/v1/projects/$PROJECT_ID/databases/(default)/documents"
```

Quy ước ID: `storyId` là slug không dấu, không hoa, nối bằng `-` (ví dụ `vu-khong-loi`).
Chapter doc ID là số thứ tự zero-pad 4 chữ số: chương 7 → `0007`.

## Schema

```
stories/{storyId}
  name:        string   — tên truyện
  author:      string   — tác giả
  description: string   — giới thiệu
  cover:       string   — URL ảnh bìa (rỗng nếu không có)
  genres:      [string] — danh sách thể loại
  status:      string   — "ongoing" | "completed"
  chapterCount: number
  createdAt / updatedAt: ISO-8601 string

stories/{storyId}/chapters/{chapId}
  title:   string
  number:  number
  content: string   — HTML đơn giản (<p>, <br>) hoặc text xuống dòng
  updatedAt: ISO-8601 string

meta/genres
  genres: [{name: string, count: number}]
```

## 1. Tạo / cập nhật truyện

```bash
curl -X POST "$BASE/stories?documentId=vu-khong-loi&key=$API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "name":         {"stringValue": "Vũ Khôi Lỗi"},
      "author":       {"stringValue": "Unknown"},
      "description":  {"stringValue": "Truyện mẫu do agent đăng."},
      "cover":        {"stringValue": ""},
      "genres":       {"arrayValue": {"values": [{"stringValue": "kiếm hiệp"}]}},
      "status":       {"stringValue": "ongoing"},
      "chapterCount": {"integerValue": "0"},
      "createdAt":    {"timestampValue": "2026-11-10T00:00:00Z"},
      "updatedAt":    {"timestampValue": "2026-11-10T00:00:00Z"}
    }
  }'
```

Cập nhật một field (merge, không ghi đè phần khác): dùng `PATCH` với cùng body `{"fields": ...}` thêm `&updateFields=name,updatedAt`.

## 2. Đăng chương

```bash
curl -X POST "$BASE/stories/vu-khong-loi/chapters?documentId=0001&key=$API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "title":     {"stringValue": "Chương 1"},
      "number":    {"integerValue": "1"},
      "content":   {"stringValue": "<p>Nội dung chương...</p>"},
      "updatedAt": {"timestampValue": "2026-11-10T00:00:00Z"}
    }
  }'
```

Sau khi đăng chương, cập nhật lại `chapterCount` và `updatedAt` trên story doc (PATCH).

## 3. Đọc dữ liệu (debug)

```bash
# một truyện
curl "$BASE/stories/vu-khong-loi?key=$API_KEY"

# danh sách chương
curl "$BASE/stories/vu-khong-loi/chapters?orderBy=__name__&key=$API_KEY"

# mọi truyện
curl "$BASE/stories?key=$API_KEY"
```

## 4. Xóa

```bash
curl -X DELETE "$BASE/stories/vu-khong-loi/chapters/0001?key=$API_KEY"
curl -X DELETE "$BASE/stories/vu-khong-loi?key=$API_KEY"   # nhớ xóa chapters trước
```

## Ghi chú bảo mật

- `firestore.rules` đang deploy: **read + write công khai** (agent ghi bằng API key không cần auth — giai đoạn thử nghiệm). Khi muốn siết, đổi sang `allow write: if request.auth != null` trong `yangio-web/firestore.rules` rồi `firebase deploy --only firestore:rules --project ant05-efa02`; agent khi đó login lấy ID token và thêm header `Authorization: Bearer <id_token>`.
- Giá trị `integerValue` phải là **string** theo Firestore REST spec.
- Không vượt quá ~1MB mỗi document; chương dài hơn nên tách làm nhiều phần (`0001a`, `0001b`) và đặt cùng `number`.
