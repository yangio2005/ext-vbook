<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Danh sách truyện</title>
	<link rel="icon" href="/uploads/logo.png" type="image/png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --bg-color: #f5f7fa;
            --text-main: #2d3748;
            --text-muted: #718096;
            --text-light: #a0aec0;
            --border-color: #e2e8f0;
            --shadow: 0 5px 20px rgba(0,0,0,0.08);
        }

        body { background: var(--bg-color); font-family: 'Segoe UI', sans-serif; padding-bottom: 40px; }
        .container-fluid { max-width: 100%; padding: 0 20px; }

        .filter-header { background: var(--primary-gradient); color: white; padding: 25px 0; margin-bottom: 30px; border-radius: 0 0 20px 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .filter-header h1 { font-weight: 700; font-size: 2.2rem; margin-bottom: 10px; }
        .filter-header .subtitle { font-size: 1.1rem; opacity: 0.9; }

        .main-content-wrapper { display: flex; gap: 25px; }
        .sidebar { width: 480px; flex-shrink: 0; }
        .main { flex: 1; }

        .sidebar-card, .content-card { background: white; border-radius: 15px; box-shadow: var(--shadow); border: none; padding: 25px; }
        .sidebar-card { position: sticky; top: 20px; max-height: calc(100vh - 40px); overflow-y: auto; }

        .sidebar-card::-webkit-scrollbar { width: 8px; }
        .sidebar-card::-webkit-scrollbar-track { background: #f8f9fa; border-radius: 10px; }
        .sidebar-card::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }

        .filter-group { padding-bottom: 20px; }
        .filter-title { font-weight: 700; margin-bottom: 15px; font-size: 1.1rem; color: var(--text-main); display: flex; align-items: center; gap: 10px; }
        .filter-title i { color: #667eea; }

        .filter-btn { 
            font-size: 0.8rem; margin: 3px; padding: 5px 12px; border-radius: 6px; 
            border: 1px solid var(--border-color); color: #4a5568 !important; 
            background: #fff !important; transition: all 0.2s; font-weight: 500; 
        }
        .filter-btn.active { background: var(--primary-gradient) !important; color: #fff !important; border: none; box-shadow: 0 2px 6px rgba(102, 126, 234, 0.4); }
        .filter-btn:hover:not(.active) { background: #edf2f7 !important; border-color: #cbd5e0 !important; }

        .story-list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #f0f4f8; }
        .story-list-header h2 { font-size: 1.5rem; font-weight: 700; margin: 0; }
        .story-count { background: #eae4d3; color: #343a40; padding: 4px 12px; border-radius: 15px; font-weight: 600; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 4px; }

        .story-item { background: white; border: 1px solid #eef2f7; border-radius: 12px; padding: 12px 15px; display: flex; gap: 15px; transition: all 0.3s; }
        .story-item:hover { border-color: #667eea; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1); transform: translateY(-2px); }
        .story-poster { width: 110px; height: 150px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        
        .story-content { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
        .story-title { font-size: 1.3rem; font-weight: 700; color: var(--text-main); text-decoration: none; transition: 0.2s; }
        .story-title:hover { color: #667eea; }
        
        .story-meta { font-size: 0.9rem; color: var(--text-muted); display: flex; flex-wrap: wrap; gap: 15px; }
        .story-meta span { display: inline-flex; align-items: center; gap: 5px; }
        .story-meta i { color: var(--text-light); }

        .story-desc { font-size: 0.95rem; color: #4a5568; line-height: 1.6; margin-bottom: 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .story-footer { display: flex; justify-content: space-between; align-items: center; }
        .story-updated { font-size: 0.85rem; color: var(--text-light); }

        .btn-read, .btn-detail { padding: 6px 16px; border-radius: 6px; font-weight: 600; font-size: 0.9rem; transition: 0.3s; }
        .btn-read { background: var(--primary-gradient); color: white; border: none; }
        .btn-read:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(102, 126, 234, 0.4); color: white; }
        .btn-detail { border: 1px solid var(--border-color); color: #4a5568; }
        .btn-detail:hover { border-color: #667eea; color: #667eea; background: #f8fafc; }

        .pagination { margin-top: 30px; gap: 5px; justify-content: center; }
        .page-link { border-radius: 8px !important; border: none; color: #4a5568; font-weight: 600; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; transition: 0.3s; background: #f8fafc; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .page-link:hover { background: #e2e8f0; transform: translateY(-2px); }
        .page-item.active .page-link { background: var(--primary-gradient); color: white; box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3); }
        .empty-state { text-align: center; padding: 60px 20px; width: 100%; }
        .empty-state i { font-size: 4rem; color: var(--text-light); margin-bottom: 20px; display: block; }
        .empty-state h3 { color: var(--text-muted); margin-bottom: 15px; font-weight: 700; }
        .empty-state p { color: var(--text-light); max-width: 500px; margin: 0 auto 25px; }
        
        @media (max-width: 992px) {
            .main-content-wrapper { flex-direction: column; }
            .sidebar { width: 100% !important; }
            .sidebar-card { position: static; max-height: none; box-shadow: none; border-radius: 0; padding-bottom: 80px; }
            .offcanvas-header { background: var(--primary-gradient); color: white; }
            .btn-close { filter: invert(1) grayscale(100%) brightness(200%); }
        }
        
        @media (max-width: 768px) {
            .filter-header h1 { font-size: 1.8rem; }
            .story-item { flex-direction: column; align-items: center; text-align: center; }
            .story-poster { width: 140px; height: 190px; }
            .story-header { flex-direction: column; gap: 10px; }
            .story-meta { justify-content: center; gap: 4px 12px !important; margin-top: 5px; }
            .story-meta span { margin-right: 0 !important; }
            .story-footer { flex-direction: column !important; gap: 15px !important; width: 100%; }
            .story-actions { width: 100%; justify-content: center; display: flex; gap: 10px; }
            .story-content { width: 100%; padding-left: 0 !important; }
            .story-list-header h2 { font-size: 1.1rem !important; }
            .story-count { font-size: 0.75rem !important; padding: 4px 10px !important; }
            .story-list-header { margin-bottom: 15px !important; padding-bottom: 10px !important; }
        }
    </style>
</head>
<body>

    <nav class="navbar navbar-expand-lg navbar-light mb-0 sticky-top py-0" 
     style="background: linear-gradient(to bottom, #F3E5F5 0%, #E1BEE7 100%) !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important; z-index: 1020; height: 55px;">
    <div class="container">
        <div class="d-flex align-items-center justify-content-between w-100">
            <div class="d-flex align-items-center">

                <a class="navbar-brand d-flex align-items-center py-0 m-0" href="/">
                    <img src="/uploads/logo.png" alt="Logo" style="height: 40px; width: auto;">
                    <img src="/uploads/ten.png" class="d-none d-lg-block ms-2" alt="Tiệm Truyện Chữ" style="height: 55px; width: auto;">
                </a>
            </div>

            <div class="d-flex d-lg-none align-items-center gap-3">
                <button type="button" class="btn btn-link text-dark p-0" data-bs-toggle="modal" data-bs-target="#mobileSearchModal">
                    <i class="fa-solid fa-magnifying-glass fs-4"></i>
                </button>

                
                    <div class="dropdown">
                        <a href="javascript:void(0)" class="d-block text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="/data/avatar/mac-dinh.png" 
                                 class="rounded-circle border border-white shadow-sm" 
                                 style="width: 32px; height: 32px; object-fit: cover;">
                            <span class="d-none" 
                                  style="top: 0; right: -5px;"></span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end shadow-sm" style="position: absolute; right: 0;">
                            <li><div class="dropdown-header fw-bold text-truncate" style="max-width: 200px;">yangio</div></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="/account"><i class="fa-solid fa-id-card me-2 text-info"></i> Hồ sơ tài khoản</a></li>
                            <li><a class="dropdown-item" href="/thong-bao"><i class="fa-solid fa-bell me-2 text-danger"></i> Thông báo</a></li>
                            <li><a class="dropdown-item" href="/my-stories"><i class="fa-solid fa-book me-2 text-success"></i> Truyện của tôi</a></li>
                            <li><a class="dropdown-item" href="/tu-truyen"><i class="fa-solid fa-bookmark me-2 text-warning"></i> Tủ truyện</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="/logout"><i class="fa-solid fa-right-from-bracket me-2"></i> Đăng xuất</a></li>
                        </ul>
                    </div>
                
            </div>

            <div class="collapse navbar-collapse" id="navbarContent">
                <ul class="navbar-nav me-auto align-items-center">
                    <li class="nav-item dropdown ms-lg-2">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="fa-solid fa-layer-group me-1"></i> Thể loại
                        </a>
                        <ul class="dropdown-menu">
                            
                                
                                    <li>
                                        <a class="dropdown-item" href="/danh-sach?cat=hien-dai">
                                            <i class="fa-solid  me-2"></i> Hiện đại
                                        </a>
                                    </li>
                                
                                    <li>
                                        <a class="dropdown-item" href="/danh-sach?cat=co-dai">
                                            <i class="fa-solid  me-2"></i> Cổ đại
                                        </a>
                                    </li>
                                
                                    <li>
                                        <a class="dropdown-item" href="/danh-sach?cat=tien-hiep">
                                            <i class="fa-solid  me-2"></i> Tiên hiệp
                                        </a>
                                    </li>
                                
                                    <li>
                                        <a class="dropdown-item" href="/danh-sach?cat=huyen-huyen">
                                            <i class="fa-solid  me-2"></i> Huyền huyễn
                                        </a>
                                    </li>
                                
                                    <li>
                                        <a class="dropdown-item" href="/danh-sach?cat=do-thi">
                                            <i class="fa-solid  me-2"></i> Đô thị
                                        </a>
                                    </li>
                                
                                    <li>
                                        <a class="dropdown-item" href="/danh-sach?cat=khoa-huyen">
                                            <i class="fa-solid  me-2"></i> Khoa huyễn
                                        </a>
                                    </li>
                                
                                    <li>
                                        <a class="dropdown-item" href="/danh-sach?cat=huyen-nghi">
                                            <i class="fa-solid  me-2"></i> Huyền nghi
                                        </a>
                                    </li>
                                
                                    <li>
                                        <a class="dropdown-item" href="/danh-sach?cat=linh-di">
                                            <i class="fa-solid  me-2"></i> Linh dị
                                        </a>
                                    </li>
                                
                                    <li>
                                        <a class="dropdown-item" href="/danh-sach?cat=vong-du">
                                            <i class="fa-solid  me-2"></i> Võng du
                                        </a>
                                    </li>
                                
                                    <li>
                                        <a class="dropdown-item" href="/danh-sach?cat=dong-nhan">
                                            <i class="fa-solid  me-2"></i> Đồng nhân
                                        </a>
                                    </li>
                                
                                    <li>
                                        <a class="dropdown-item" href="/danh-sach?cat=canh-ky">
                                            <i class="fa-solid  me-2"></i> Cạnh kỹ
                                        </a>
                                    </li>
                                
                            
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="/danh-sach?cat=khac"><i class="fa-solid fa-ellipsis me-2"></i> Khác</a></li>
                        </ul>
                    </li>

                    <li class="nav-item d-none d-lg-block"><a class="nav-link" href="/danh-sach?type=truyen-dich">🍓 Truyện Dịch</a></li>
                    <li class="nav-item d-none d-lg-block"><a class="nav-link" href="/danh-sach?type=truyen-cv">⚡ Truyện CV</a></li>
                    <li class="nav-item d-none d-lg-block"><a class="nav-link" href="/danh-sach?type=sang-tac">✍️ Sáng Tác</a></li>
                    <li class="nav-item d-none d-lg-block"><a class="nav-link" href="/danh-sach?gender=nu">❤️ Truyện Nữ</a></li>
                    <li class="nav-item d-none d-lg-block"><a class="nav-link" href="/danh-sach?gender=nam">🔥 Truyện Nam</a></li>
                </ul>

                <div class="d-none d-lg-flex gap-3 align-items-center mt-3 mt-lg-0">
                    <form action="/danh-sach" method="GET">
                        <div class="input-group input-group-sm" style="width: 220px;">
                            <input type="text" name="keyword" class="form-control" placeholder="Tìm truyện, tác giả..." required>
                            <button class="btn btn-outline-secondary" type="submit"><i class="fa fa-search"></i></button>
                        </div>
                    </form>

                    
                    <div class="dropdown">
                        <button class="btn btn-light btn-sm fw-bold dropdown-toggle border position-relative d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                            <img src="/data/avatar/mac-dinh.png" class="rounded-circle me-2" style="width: 24px; height: 24px; object-fit: cover; border: 1px solid #ddd;">
                            <span>yangio</span>
                            <span id="account-noti-dot" class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle d-none">
                                <span class="visually-hidden">New alerts</span>
                            </span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                            <li><a class="dropdown-item" href="/account"><i class="fa-solid fa-id-card me-2 text-info"></i> Hồ sơ tài khoản</a></li>
                            <li>
                                <div class="dropdown-item d-flex justify-content-between align-items-center position-relative" id="noti-dropdown-container">
                                    <a href="/thong-bao" class="text-decoration-none text-dark d-flex align-items-center w-100">
                                        <i class="fa-solid fa-bell me-2 text-danger"></i> Thông báo
                                    </a>
                                    <span id="noti-badge" class="badge bg-danger rounded-pill ms-2 d-none">
                                        0
                                    </span>
                                </div>
                            </li>
                            <li><a class="dropdown-item" href="/my-stories"><i class="fa-solid fa-book me-2 text-success"></i> Truyện của tôi</a></li>
                            <li><a class="dropdown-item" href="/tu-truyen"><i class="fa-solid fa-bookmark me-2 text-warning"></i> Tủ truyện</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="/logout"><i class="fa-solid fa-right-from-bracket me-2"></i> Đăng xuất</a></li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</nav>

<div id="mobile-nav-scroll" class="d-lg-none sticky-top bg-white border-bottom shadow-sm transition-custom" style="top: 54.5px; z-index: 1015;">
    <div class="mobile-scroll-menu d-flex align-items-center py-2 px-2" style="gap: 5px; width: 100%;">
        <a href="/danh-sach?type=truyen-dich" class="btn-mobile-nav nav-dich">🍓 Truyện Dịch</a>
        <a href="/danh-sach?type=truyen-cv" class="btn-mobile-nav nav-cv">⚡ Truyện CV</a>
        <a href="/danh-sach?type=sang-tac" class="btn-mobile-nav nav-ngan">✍️ Sáng Tác</a>
        <a href="/danh-sach?gender=nu" class="btn-mobile-nav nav-cv">❤️ Nữ</a>
        <a href="/danh-sach?gender=nam" class="btn-mobile-nav nav-nam">🔥 Nam</a>
    </div>
</div>

<div class="modal fade" id="mobileSearchModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
            <div class="modal-body p-3">
                <form action="/danh-sach" method="GET" class="d-flex gap-2">
                    <input type="text" name="keyword" class="form-control" placeholder="Nhập tên truyện..." required autofocus>
                    <button class="btn btn-primary" type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="authModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg overflow-hidden" style="border-radius: 15px;">
            <div class="modal-header d-block p-0 border-0">
                <div class="p-4 text-center text-white" style="background: linear-gradient(45deg, #dc3545, #ff6b6b);">
                    <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>
                    <h4 class="fw-bold mb-1"><i class="fa-solid fa-circle-user me-2"></i> TIỆM TRUYỆN CHỮ</h4>
                    <small id="authModalSubtitle">Chào mừng bạn đến với thế giới truyện</small>
                </div>
                <ul class="nav nav-tabs nav-fill border-0 bg-light" role="tablist">
                    <li class="nav-item">
                        <button class="nav-link active fw-bold py-3 text-secondary border-0 rounded-0" id="login-tab" data-bs-toggle="tab" data-bs-target="#tab-login" type="button">ĐĂNG NHẬP</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link fw-bold py-3 text-secondary border-0 rounded-0" id="register-tab" data-bs-toggle="tab" data-bs-target="#tab-register" type="button">ĐĂNG KÝ</button>
                    </li>
                </ul>
            </div>

            <div class="modal-body p-4">
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="tab-login">
                        <form action="/login" method="POST">
                            <div class="mb-3">
                                <label class="form-label fw-bold text-secondary small">Tên đăng nhập</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-user text-muted"></i></span>
                                    <input name="username" class="form-control bg-light border-start-0" placeholder="Nhập tài khoản" required>
                                </div>
                            </div>
                            <div class="mb-4">
                                <label class="form-label fw-bold text-secondary small">Mật khẩu</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-lock text-muted"></i></span>
                                    <input type="password" name="password" class="form-control bg-light border-start-0" placeholder="Nhập mật khẩu" required>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-danger w-100 fw-bold py-2 mb-3 shadow-sm" style="background-color: #dc3545; border: none;">ĐĂNG NHẬP NGAY</button>
                            <div class="text-center">
                                <a href="javascript:void(0)" class="text-decoration-none text-danger fw-bold small" data-bs-toggle="modal" data-bs-target="#forgotPasswordModal">
                                    <i class="fa-solid fa-key me-1"></i> Quên mật khẩu?
                                </a>
                            </div>
                        </form>
                    </div>

                    <div class="tab-pane fade" id="tab-register">
                        <form action="/register" method="POST">
                            <div class="mb-3">
                                <label class="form-label fw-bold text-secondary small">Tên tài khoản mới</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-user-plus text-muted"></i></span>
                                    <input name="username" class="form-control bg-light border-start-0" placeholder="Chữ cái không dấu và số" required>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold text-secondary small">Email đăng ký</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-envelope text-muted"></i></span>
                                    <input type="email" name="email" class="form-control bg-light border-start-0" placeholder="Email để khôi phục mật khẩu" required>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold text-secondary small">Mật khẩu mới</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-lock text-muted"></i></span>
                                    <input type="password" name="password" class="form-control bg-light border-start-0" placeholder="Ít nhất 6 ký tự" required>
                                </div>
                            </div>
                            <div class="mb-4">
                                <label class="form-label fw-bold text-secondary small">Xác nhận mật khẩu</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-shield-check text-muted"></i></span>
                                    <input type="password" name="confirm_password" class="form-control bg-light border-start-0" placeholder="Nhập lại mật khẩu" required>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-success w-100 fw-bold py-2 shadow-sm" style="background: linear-gradient(to right, #20bf6b, #0eb87f); border: none;">TẠO TÀI KHOẢN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="forgotPasswordModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 15px;">
            <div class="modal-header text-white" style="background: linear-gradient(45deg, #6f42c1, #a18cd1);">
                <h5 class="modal-title fw-bold"><i class="fa-solid fa-key me-2"></i>KHÔI PHỤC MẬT KHẨU</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
            
                <div id="forgot-step-1">
                    <p class="small text-muted mb-3">Vui lòng nhập chính xác tên tài khoản và email để nhận mã xác thực (OTP).</p>
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Tên tài khoản</label>
                        <input type="text" id="forgot_username" class="form-control bg-light" placeholder="Nhập username của bạn">
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Email đăng ký</label>
                        <input type="email" id="forgot_email" class="form-control bg-light" placeholder="Nhập email đã đăng ký">
                    </div>
                    <button class="btn btn-primary w-100 fw-bold py-2" id="btn-send-otp" onclick="handleSendOTP()">
                        <span class="spinner-border spinner-border-sm d-none me-2" id="forgot-spinner"></span>GỬI MÃ OTP
                    </button>
                </div>

                <div id="forgot-step-2" class="d-none">
                    <div class="text-center mb-3">
                        <div class="display-6 text-success mb-2"><i class="fa-solid fa-envelope-circle-check"></i></div>
                        <p class="small">Mã xác thực đã được gửi vào email của bạn. Vui lòng kiểm tra (kể cả hộp thư rác).</p>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold text-center d-block">Nhập mã OTP (6 số)</label>
                        <input type="text" id="forgot_otp_code" class="form-control text-center fw-bold fs-4 letter-spacing-lg" maxlength="6" placeholder="000000">
                    </div>
                    <button class="btn btn-success w-100 fw-bold py-2" onclick="handleVerifyOTP()">XÁC NHẬN MÃ</button>
                    <button class="btn btn-link btn-sm w-100 mt-2 text-decoration-none" onclick="backToStep1()">Quay lại</button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    body {
        margin: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: #F5F0FF;
        color: #4A3B55;
    }

    .header-container { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; }
    
    #toast-container { position: fixed; top: 80px; right: 20px; z-index: 99999; display: flex; flex-direction: column; gap: 10px; }
    .custom-toast { 
        min-width: 200px; max-width: 350px; color: white; border-radius: 5px; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; flex-direction: column; 
        overflow: hidden; animation: slideInRight 0.5s ease forwards; opacity: 0; 
    }
    .toast-error { background-color: #ff4d4f; }
    .toast-success { background-color: #52c41a; }
    .toast-body-custom { display: flex; align-items: center; padding: 12px 20px; }
    .toast-icon { font-size: 1.2rem; margin-right: 12px; }
    .toast-message { font-size: 0.95rem; font-weight: 500; flex: 1; }
    .toast-progress { height: 4px; background: rgba(255,255,255,0.6); animation: progressRun 5s linear forwards; }

    .sidebar-menu .list-group-item {
        border: none; background: transparent; color: #555; font-weight: 500; 
        padding: 12px 15px; border-radius: 8px; transition: .2s; border-left: 3px solid transparent;
    }
    .sidebar-menu .list-group-item:hover, .sidebar-menu .active-item { 
        background: #f0f2f5; color: #dc3545 !important; border-left-color: #dc3545; 
    }
    .sidebar-title { color: #6c757d; font-weight: 600; font-size: .8rem; text-transform: uppercase; margin: 20px 0 8px 15px; }

    @media (min-width: 992px) {
        #sidebarMenu { position: fixed; top: 55px; left: 0; bottom: 0; width: 225px; background: #fff; border-right: 1px solid #dee2e6; z-index: 1020; overflow-y: auto; }
        .main-content { margin-left: 225px; width: calc(100% - 225px); padding: 20px; min-height: 100vh; }

        @media (max-width: 1400px) {
            .navbar-brand img[alt="Tiệm Truyện Chữ"] { height: 45px !important; }
            .navbar-nav .nav-link { padding-left: 8px !important; padding-right: 8px !important; font-size: 14px !important; }
            .input-group.input-group-sm { width: 160px !important; }
        }
    }

    @media (max-width: 992px) {
        #sidebarMenu {
            position: fixed !important; top: 105px !important; left: 0 !important; bottom: 0 !important;
            width: 60% !important; max-width: 300px; z-index: 1040 !important; transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; visibility: visible !important;
            background: #fff; box-shadow: 5px 0 15px rgba(0,0,0,0.1); border-right: 1px solid #eee;
        }
        #sidebarMenu.active { transform: translateX(0) !important; }
        .main-content { margin-left: 0 !important; width: 100% !important; padding: 10px; }
        .sidebar-overlay { display: none; position: fixed; top: 55px; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); z-index: 1035; backdrop-filter: blur(2px); }
        .sidebar-overlay.show { display: block; }
        .navbar-brand { position: absolute; left: 50%; transform: translateX(-50%); }
        .mobile-scroll-menu { overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
        .mobile-scroll-menu::-webkit-scrollbar { display: none; }
        .btn-mobile-nav { flex: 1; font-size: 11px !important; font-weight: 600; padding: 6px 2px !important; text-align: center; text-decoration: none !important; border-radius: 20px; display: block; border: 1px solid transparent; transition: 0.2s; }
        .btn-mobile-nav:hover, .btn-mobile-nav:active, .btn-mobile-nav:focus { text-decoration: none !important; outline: none; opacity: 0.7; transform: scale(0.95); }
    }

    .role-mod{color:#0d6efd;font-weight:bold}
    .role-admin{color:#dc3545;font-weight:bold}
    .role-htdb{
        font-weight:bold; background-image:linear-gradient(to left,violet,indigo,blue,green,yellow,orange,red);
        -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        background-size:400%; animation:rainbow_animation 5s infinite;
    }

    @keyframes rainbow_animation { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
    @keyframes slideInRight { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: none; } }
    @keyframes progressRun { from { width: 100%; } to { width: 0%; } }

    .nav-up { transform: translateY(-110%) !important; opacity: 0; }
    .fadeOut { animation: fadeOutCustom 0.5s forwards; }
    @keyframes fadeOutCustom { from { opacity: 1; } to { opacity: 0; transform: translateX(100%); } }

    .nav-ngan { color: #198754; border-color: #198754; background: #f8fffb; }
    .nav-dich { color: #dc3545; border-color: #dc3545; background: #fff8f8; }
    .nav-cv   { color: #856404; border-color: #ffc107; background: #fffdf5; }
    .nav-nam  { color: #0dcaf0; border-color: #0dcaf0; background: #f4feff; }
    .letter-spacing-lg { letter-spacing: 5px; }
</style>

<div id="toast-container"></div>
<script src="/socket.io/socket.io.js"></script>
<script>

    function showToast(message, type = 'error') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        let bgClass = 'toast-error';
        let iconClass = 'fa-triangle-exclamation';
        if (type === 'success') {
            bgClass = 'toast-success';
            iconClass = 'fa-circle-check';
        }
        toast.classList.add('custom-toast', bgClass);
        toast.innerHTML = `
            <div class="toast-body-custom">
                <i class="fa-solid ${iconClass} toast-icon"></i>
                <span class="toast-message">${message}</span>
            </div>
            <div class="toast-progress"></div>
        `;
        container.appendChild(toast);
        setTimeout(() => { removeToast(toast); }, 5000);
    }

    function removeToast(toastElement) {
        if (!toastElement) return;
        toastElement.classList.add('fadeOut');
        toastElement.addEventListener('animationend', () => {
            if(toastElement.parentElement) toastElement.remove();
        });

        setTimeout(() => {
            if (toastElement && toastElement.parentNode) toastElement.remove();
        }, 600);
    }

    let lastUnreadCount = -1;

    function updateNotificationUI(data) {
        const badge = document.getElementById('noti-badge');
        const accountDot = document.getElementById('account-noti-dot');
        const list = document.getElementById('noti-list');
        if (!badge || !list) return;
        if (data.unreadCount > 0) {
            badge.innerText = data.unreadCount;
            badge.classList.remove('d-none');
            if (accountDot) accountDot.classList.remove('d-none');
        } else {
            badge.classList.add('d-none');
            if (accountDot) accountDot.classList.add('d-none');
        }
        if (data.notifications && data.notifications.length > 0) {
            let html = '';
            data.notifications.slice(0, 5).forEach(n => {
                const avatarSrc = n.sender_avatar || '/data/avatar/mac-dinh.png';
                html += `
                    <li>
                        <a class="dropdown-item text-wrap p-3 border-bottom ${n.read ? '' : 'bg-light'}" href="${n.link}" style="font-size: 0.85rem;">
                            <div class="d-flex align-items-start">
                                <img src="${avatarSrc}" class="rounded-circle me-2" style="width: 35px; height: 35px; object-fit: cover; border: 1px solid #eee;">
                                <div class="flex-grow-1">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <small class="text-secondary" style="font-size: 0.7rem;">${n.time}</small>
                                        ${!n.read ? '<i class="fa-solid fa-circle text-danger" style="font-size: 0.5rem;"></i>' : ''}
                                    </div>
                                    <div class="text-dark">${n.content}</div>
                                </div>
                            </div>
                        </a>
                    </li>`;
            });
            html += `<li><a class="dropdown-item text-center text-primary fw-bold small py-2 bg-white" href="/thong-bao">Xem tất cả</a></li>`;
            list.innerHTML = html;
        } else {
            list.innerHTML = `<li class="text-center text-muted small py-4">Không có thông báo nào</li>`;
        }
    }

    async function handleSendOTP() {
        const username = document.getElementById('forgot_username').value.trim();
        const email = document.getElementById('forgot_email').value.trim();
        const btn = document.getElementById('btn-send-otp');
        const spinner = document.getElementById('forgot-spinner');

        if (!username || !email) {
            return showToast("⚠️ Vui lòng nhập đầy đủ thông tin!", "error");
        }

        btn.disabled = true;
        spinner.classList.remove('d-none');

        try {
            const response = await fetch('/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email })
            });

            const data = await response.json();

            if (data.success) {
                showToast("✅ Đã gửi mã OTP thành công!", "success");
                document.getElementById('forgot-step-1').classList.add('d-none');
                document.getElementById('forgot-step-2').classList.remove('d-none');
            } else {
                showToast(data.message || "❌ Có lỗi xảy ra!", "error");
            }
        } catch (err) {
            showToast("❌ Lỗi kết nối hệ thống!", "error");
        } finally {
            btn.disabled = false;
            spinner.classList.add('d-none');
        }
    }

    async function handleVerifyOTP() {
        const otp = document.getElementById('forgot_otp_code').value.trim();

        if (otp.length < 6) {
            return showToast("⚠️ Vui lòng nhập đủ 6 số OTP!", "error");
        }

        try {
            const response = await fetch('/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp })
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = data.redirectUrl; 
            } else {
                showToast(data.message, "error");
            }
        } catch (err) {
            showToast("❌ Lỗi xác thực OTP!", "error");
        }
    }

    function backToStep1() {
        document.getElementById('forgot-step-1').classList.remove('d-none');
        document.getElementById('forgot-step-2').classList.add('d-none');
    }

    async function fetchNotifications() {
        if (!document.getElementById('noti-badge')) return;
        try {
            const res = await fetch('/api/notifications/latest');
            const data = await res.json();
            if (data.success) {
                updateNotificationUI(data);
            }
        } catch (e) {
            console.error("Lỗi cập nhật thông báo:", e);
        }
    }

    const socket = io({ 
		transports: ['websocket'], 
		upgrade: false 
	});
    
			socket.emit('register-notify', 'yangio');
    

    socket.on('new-notification', (notif) => {
        const isToastDisabled = localStorage.getItem('disableToasts') === 'true';
        
        if (!isToastDisabled) {
            const plainText = notif.content.replace(/<[^>]*>?/gm, ''); 
            showToast(`🔔 ${plainText}`, 'success');
        }

        const accountDot = document.getElementById('account-noti-dot');
        if (accountDot) accountDot.classList.remove('d-none');
        fetchNotifications(); 
    });

    document.addEventListener('DOMContentLoaded', () => {
        fetchNotifications();

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('auth') === 'login') {
            const authModalEl = document.getElementById('authModal');
            if (authModalEl) {
                const loginTab = document.getElementById('login-tab');
                if (loginTab) loginTab.click();
                const authModal = new bootstrap.Modal(authModalEl);
                authModal.show();
                // Tùy chọn: Xóa tham số trên URL cho đẹp
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }

        
        
    });
	
	let lastScrollY = window.scrollY;
	const mobileNav = document.getElementById('mobile-nav-scroll');

	window.addEventListener('scroll', () => {
		if (window.innerWidth < 992 && mobileNav) {
			let currentScrollY = window.scrollY;

			if (currentScrollY > lastScrollY && currentScrollY > 80) {
				mobileNav.classList.add('nav-up');
			} else {
				mobileNav.classList.remove('nav-up');
			}
			
			lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
		}
	}, { passive: true });

    document.addEventListener('DOMContentLoaded', function() {
        const toggleBtn = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebarMenu');
        const toggleIcon = document.getElementById('toggle-icon');
        
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);

        if (toggleBtn && sidebar) {
            toggleBtn.addEventListener('click', function() {
                sidebar.classList.toggle('active');
                overlay.classList.toggle('show');
                toggleBtn.classList.toggle('active');
                
                if (sidebar.classList.contains('active')) {
                    toggleIcon.classList.remove('fa-bars');
                    toggleIcon.classList.add('fa-xmark');
                } else {
                    toggleIcon.classList.remove('fa-xmark');
                    toggleIcon.classList.add('fa-bars');
                }
            });

            overlay.addEventListener('click', function() {
                sidebar.classList.remove('active');
                overlay.classList.remove('show');
                toggleBtn.classList.remove('active');
                toggleIcon.classList.remove('fa-xmark');
                toggleIcon.classList.add('fa-bars');
            });
        }
    });
</script>

    <div class="container-fluid">
        
        <div class="d-lg-none py-3">
            <button class="btn w-100 d-flex justify-content-between align-items-center" 
                    type="button" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#filterSidebar" 
                    style="background: white; border: 1px solid #e2e8f0; box-shadow: 0 2px 10px rgba(0,0,0,0.05); color: #4a5568; font-weight: 600; padding: 12px 20px; border-radius: 12px;">
                <span><i class="fas fa-filter me-2 text-primary"></i>Bộ lọc tìm kiếm</span>
                <i class="fas fa-chevron-right text-muted"></i>
            </button>
        </div>

        <div class="main-content-wrapper">
            
            <div class="sidebar offcanvas-lg offcanvas-start" tabindex="-1" id="filterSidebar">
                
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title fw-bold"><i class="fas fa-filter me-2"></i>Bộ Lọc Truyện</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#filterSidebar" aria-label="Close"></button>
                </div>

                <div class="offcanvas-body p-0">
                    <div class="sidebar-card w-100">
                        <script>
                            function applyFilter(key, value) {
                                const url = new URL(window.location.href);
                                if (value === 'all' || value === '') {
                                    url.searchParams.delete(key);
                                } else {
                                    url.searchParams.set(key, value);
                                }
                                window.location.href = url.toString();
                            }
                        </script>

                        <div class="filter-group">
                            <div class="filter-title">
                                <i class="fas fa-chart-line"></i>
                                Tình trạng
                            </div>
                            <div class="d-flex flex-wrap">
                                <button onclick="applyFilter('status', 'all')" 
                                        class="btn filter-btn active">
                                    <i class="fas fa-layer-group me-1"></i>Toàn bộ
                                </button>
                                <button onclick="applyFilter('status', 'ongoing')" 
                                        class="btn filter-btn ">
                                    <i class="fas fa-spinner me-1"></i>Đang ra
                                </button>
                                <button onclick="applyFilter('status', 'full')" 
                                        class="btn filter-btn ">
                                    <i class="fas fa-check-circle me-1"></i>Hoàn thành
                                </button>
                            </div>
                        </div>

                        <div class="filter-group">
                            <div class="filter-title">
                                <i class="fas fa-book-open"></i>
                                Loại truyện
                            </div>
                            <div class="d-flex flex-wrap">
                                <button onclick="applyFilter('type', 'all')" 
                                        class="btn filter-btn active">Tất cả</button>
                                <button onclick="applyFilter('type', 'sang-tac')" 
                                        class="btn filter-btn ">Sáng tác</button>
                                <button onclick="applyFilter('type', 'truyen-dich')" 
                                        class="btn filter-btn ">Dịch</button>
                                <button onclick="applyFilter('type', 'truyen-cv')" 
                                        class="btn filter-btn ">Convert</button>
                            </div>
                        </div>

                        <div class="filter-group">
                            <div class="filter-title">
                                <i class="fas fa-venus-mars"></i>
                                Giới tính
                            </div>
                            <div class="d-flex flex-wrap">
                                <button onclick="applyFilter('gender', 'all')" 
                                        class="btn filter-btn active">Toàn bộ</button>
                                <button onclick="applyFilter('gender', 'nam')" 
                                        class="btn filter-btn ">Truyện Nam</button>
                                <button onclick="applyFilter('gender', 'nu')" 
                                        class="btn filter-btn ">Truyện Nữ</button>
                            </div>
                        </div>
                        <div class="filter-group">
                            <div class="filter-title">
                                <i class="fas fa-tags"></i>
                                Thể loại
                            </div>
                            <div class="d-flex flex-wrap">
                                <button onclick="applyFilter('cat', 'all')" 
                                        class="btn filter-btn active">Tất cả</button>
                                
                                    <button onclick="applyFilter('cat', 'hien-dai')" 
                                            class="btn filter-btn ">
                                        Hiện đại
                                    </button>
                                
                                    <button onclick="applyFilter('cat', 'co-dai')" 
                                            class="btn filter-btn ">
                                        Cổ đại
                                    </button>
                                
                                    <button onclick="applyFilter('cat', 'tien-hiep')" 
                                            class="btn filter-btn ">
                                        Tiên hiệp
                                    </button>
                                
                                    <button onclick="applyFilter('cat', 'huyen-huyen')" 
                                            class="btn filter-btn ">
                                        Huyền huyễn
                                    </button>
                                
                                    <button onclick="applyFilter('cat', 'do-thi')" 
                                            class="btn filter-btn ">
                                        Đô thị
                                    </button>
                                
                                    <button onclick="applyFilter('cat', 'khoa-huyen')" 
                                            class="btn filter-btn ">
                                        Khoa huyễn
                                    </button>
                                
                                    <button onclick="applyFilter('cat', 'huyen-nghi')" 
                                            class="btn filter-btn ">
                                        Huyền nghi
                                    </button>
                                
                                    <button onclick="applyFilter('cat', 'linh-di')" 
                                            class="btn filter-btn ">
                                        Linh dị
                                    </button>
                                
                                    <button onclick="applyFilter('cat', 'vong-du')" 
                                            class="btn filter-btn ">
                                        Võng du
                                    </button>
                                
                                    <button onclick="applyFilter('cat', 'dong-nhan')" 
                                            class="btn filter-btn ">
                                        Đồng nhân
                                    </button>
                                
                                    <button onclick="applyFilter('cat', 'canh-ky')" 
                                            class="btn filter-btn ">
                                        Cạnh kỹ
                                    </button>
                                
                            </div>
                        </div>

                        <div class="filter-group">
                            <div class="filter-title">
                                <i class="fas fa-sort-amount-down"></i>
                                Sắp xếp theo
                            </div>
                            <div class="d-flex flex-wrap">
                                <button onclick="applyFilter('sort', 'updated')" 
                                        class="btn filter-btn active">
                                    Mới cập nhật
                                </button>
                                <button onclick="applyFilter('sort', 'new')" 
                                        class="btn filter-btn ">
                                    Truyện mới
                                </button>
                                <button onclick="applyFilter('sort', 'chapter')" 
                                        class="btn filter-btn ">
                                    Số chương
                                </button>
                            </div>
                        </div>
                        <div class="filter-group">
                            <div class="filter-title">
                                <i class="fas fa-list-ol"></i>
                                Số chương
                            </div>
                            <div class="d-flex flex-wrap">
                                <button onclick="applyFilter('ch', 'all')" 
                                        class="btn filter-btn active">
                                    Toàn bộ
                                </button>
                                <button onclick="applyFilter('ch', '0-300')" 
                                        class="btn filter-btn ">
                                    < 300
                                </button>
                                <button onclick="applyFilter('ch', '300-1000')" 
                                        class="btn filter-btn ">
                                    300 - 1000
                                </button>
                                <button onclick="applyFilter('ch', '1000-2000')" 
                                        class="btn filter-btn ">
                                    1000 - 2000
                                </button>
                                <button onclick="applyFilter('ch', '2000-99999')" 
                                        class="btn filter-btn ">
                                    > 2000
                                </button>
                            </div>
                        </div>
                        <div class="filter-group border-0 pt-3">
                            <button onclick="clearAllFilters()" class="btn w-100" 
                                    style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 12px; border-radius: 10px; font-weight: 600;">
                                <i class="fas fa-redo me-2"></i>Xóa tất cả bộ lọc
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main">
                <div class="content-card">
                    <div class="story-list-header">
                        <h2>
                            <i class="fas fa-book me-2 text-primary"></i>
                            <span id="filter-title-text">
                                
                                    Danh sách truyện
                                
                            </span>
                        </h2>
                        <div class="story-count">
							<i class="fas fa-bookmark me-1"></i>
							1576 truyện
						</div>
                    </div>

                    <div id="story-list-container">
                        
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/966" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/966/poster.jpg?v=1770807773244" class="story-poster" alt="Cửu Vực Kiếm Đế" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/966" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Cửu Vực Kiếm Đế
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Thiệu Vũ
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Huyền huyễn
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													100 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Vạn năm trước đó kiếm ý đệ nhất nhân Sở Kiếm Bạch, bị thất đại tông môn truy sát mà chết.

Vạn năm về sau, hắn một lần nữa sống lại, đối mặt lại là một bộ xa lạ thân thể.

Thất đại tông môn! Ta nhất định phải san bằng tất cả, trở thành Cửu Vực Đại Đế!
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 14:10 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/966/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/966" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/1630" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/1630/poster.jpg?v=1771497252591" class="story-poster" alt="Hogwarts Ma Lực Tức Chính Nghĩa" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/1630" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Hogwarts Ma Lực Tức Chính Nghĩa
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Việt Đảo Môi Việt Hạnh Vận
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Đồng nhân
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													123 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Ma lực cao thấp, quyết định chính nghĩa thuộc về.

	&#34;Chân lý, tại ma lực chênh lệch ở giữa, lịch sử, là sống sót người viết bài hát ca tụng.&#34;

	Irving Carrot nhìn xem chính mình đứng tại trước mắt mình Voldemort, còn có hắn suất lĩnh một đám Tử Thần Thực Tử, ngữ khí lạnh nhạt nói ra: &#34;Các ngươi so cơn gió còn muốn ầm ĩ, mời theo gió nhảy múa đi, vô tận chi phong.&#34;

	Nhìn xem bị cường lực vòi rồng, cuốn tới giữa không trung Voldemort cùng Tử Thần Thực Tử nhóm, Hogwarts tiến vào một loại quỷ dị trong trầm mặc, thẳng đến cái kia vừa đi đường, một bên xem sách phù thủy nhỏ lặng lẽ mất, lúc này mới có người lặng lẽ nhẹ nhàng thở ra.

	&#34;Ta liền biết rõ, cho dù là Voldemort, cũng không thể phá hủy Irving quy củ, không phải, đồng dạng sẽ nhận trừng phạt.&#34;

	Cái nào đó không nguyện ý lộ ra tính danh Weasley tiên sinh, nhìn xem trong gió xoay tròn người, sắc mặt không phải quá tốt, hắn cùng hắn song bào thai ca ca, tại năm nhất thời điểm, liền biết rõ chiêu này tự sáng tạo ma pháp uy lực. . .
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 14:08 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/1630/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/1630" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/1033" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/1033/poster.jpg?v=1770849149806" class="story-poster" alt="Đấu La: Từ Võ Hồn Thời Chi Trùng Bắt Đầu" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/1033" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Đấu La: Từ Võ Hồn Thời Chi Trùng Bắt Đầu
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Kỳ Giải
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Đồng nhân
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													1379 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Quỷ bí chi chủ bên trong Xảo Trá Chi Thần 

Đấu La đại lục  thâu đạo giả 

Đấu Phá Thương Khung  đạo hỏa nhân 

So vực ngoại tà tộc còn quỷ dị  Thiên Tôn...... 

Nhìn trước mắt  Đường Tam, Amon tự hỏi muốn hay không trộm hắn thứ sáu hồn kỹ. 

[ Xuyên thẳng qua thế giới, trạm thứ nhất Đấu La, nhân vật chính là dung hợp Amon phân thân  người xuyên việt, Đấu La, Đấu Phá, Đại Chúa Tể...... ]
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:58 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/1033/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/1033" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/712" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/712/poster.jpg?v=1770726034620" class="story-poster" alt="Lãng Tử Hồi Đầu: Ta Có Thể Thấy Trước Tương Lai" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/712" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-success story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Dịch</span>
														
														Lãng Tử Hồi Đầu: Ta Có Thể Thấy Trước Tương Lai
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													 Bạch linh
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Đô thị
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													321 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Trên đường đi làm thủ tục ly hôn,
Lâm Minh mới chợt nhận ra… cả đời này mình đã sống quá tệ bạc.

Anh bất lực trước số phận tan vỡ của cuộc hôn nhân, không thể thay đổi kết cục ly hôn.
Nhưng ngoài ý muốn, anh lại có được một năng lực kỳ lạ — nhìn thấy trước tương lai.

Giá cả tăng vọt,
cao ốc rung chuyển,
cổ phiếu lên xuống,
cục diện quốc tế biến động…

Tất cả đều hiện rõ trong đầu anh như thể đã được viết sẵn.

Nhiều năm sau, có phóng viên hỏi anh:

“Hiện giờ ngài đã giàu có đến mức sánh ngang cả một quốc gia, điều ngài muốn làm nhất là gì?”

Lâm Minh khẽ cười.

“Tôi chỉ muốn đối xử tốt hơn với vợ và con mình…
chỉ cần tốt hơn một chút thôi, là đủ rồi.”
Ủng hộ đăng kí kênh YT của mình nhé: https://www.youtube.com/@GocTruyenWOL3T
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:57 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/712/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/712" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/490" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/490/poster.jpg?v=1770603133559" class="story-poster" alt="Conan: Coi Là Chân Tửu Cùng Mori Ran Trao Đổi Cơ Thể" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/490" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Conan: Coi Là Chân Tửu Cùng Mori Ran Trao Đổi Cơ Thể
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Thử Bất Đạt Ý
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Đồng nhân
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													570 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												【 Chân Tửu 】【 Linh hồn trao đổi 】【 Sách Shin-Ran 】【 chủ giác không biết kịch bản 】【 Đơn nữ chính Mori Ran 】 

Aosawa cùng Mori Ran là hai cái hoàn toàn khác biệt người, một cái sinh hoạt tại trong hắc ám, lười nhác, tĩnh mịch. 

Một cái sinh hoạt tại dưới ánh mặt trời, rực rỡ, mỹ hảo. 

Hai người tựa như hai đầu hoàn toàn không tương giao đường thẳng song song, có lẽ đời này cũng sẽ không có gặp nhau. 

Nhưng ngoài ý muốn linh hồn trao đổi để hai người gắt gao cột vào cùng một chỗ. 

Bọn hắn bị ép đóng vai đối phương, lấy một loại không cách nào cự tuyệt tư thái đã tham dự đối phương thế giới. 

“Aosawa tiên sinh, nguyên lai thế giới của ngươi là như vậy sao? Nguy hiểm, kiềm chế, tĩnh mịch.” 

“Thiếu nữ, thu hồi ngươi quá tràn lan lòng đồng tình, hiện tại, ngươi trở thành ta.” 

“Như là đã trở thành ta, vậy thì mời Aosawa tiên sinh tạm thời quên thân phận của mình, hảo hảo thể nghiệm phổ thông cấp 3 nữ sinh sinh hoạt đi!”

...... 

Về sau, đã khôi phục nguyên bản bộ dáng Kudo Shinichi muốn rách cả mí mắt nhìn xem chính mình âu yếm nữ sinh đứng tại một nam nhân khác bên cạnh, mười ngón đan xen. 

—————— 

Ps: Sách Shin-Ran, tác giả Mori Ran mẹ ruột phấn, để ý chớ nhập. Không đen nguyên tác nhân vật. 

Ran không hắc hóa, Ran nhân sinh tín điều cũng sẽ không cho phép nàng giết người, làm ác. Nhưng thụ chủ giác ảnh hưởng sẽ Bạch Thiết Hắc, nhận biết chuyển biến, sẽ trở nên có chút xấu bụng.
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:55 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/490/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/490" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/1368" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/1368/poster.jpg?v=1771210195744" class="story-poster" alt="Lẫm Đông Tận Thế: Toàn Dân Chỗ Tránh Nạn Cầu Sinh" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/1368" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Lẫm Đông Tận Thế: Toàn Dân Chỗ Tránh Nạn Cầu Sinh
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Sơn Tầm
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Huyền huyễn
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													1123 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												【 Bạo Tuyết Mạt Nhật 】【 Cầu Sinh 】【 chỗ tránh nạn 】【 đồn vật tư 】【 làm ruộng kiến tạo 】【 vật tư thiếu thốn 】 

Trong vòng một đêm, Lục Thâm đi vào Bạo Tuyết Mạt Nhật, cực hàn, đói khát, bức xạ, sinh vật biến dị...... 

Đây là một cái xã hội sụp đổ, luật pháp sụp đổ, khí hậu hỗn loạn, vật tư thiếu thốn, tràn ngập hắc ám  hắc ám tận thế thế giới. 

Chỉ có quay chung quanh chỗ tránh nạn sinh tồn phát triển, thu thập sinh tồn vật tư, chế tạo chỗ an toàn, trồng trọt cây trồng sinh tồn, chống cự cực đoan thời tiết, đối kháng sinh vật biến dị đột kích, tìm kiếm một chút hi vọng sống......
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:50 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/1368/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/1368" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/422" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/422/poster.jpg?v=1770546473162" class="story-poster" alt="Tỷ Tỷ Là Ma Giáo Giáo Chủ" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/422" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Tỷ Tỷ Là Ma Giáo Giáo Chủ
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Sơn Trung Khô Cốt
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Tiên hiệp
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													157 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Trần Thanh Sơn xuyên qua đến vừa thông quan võ hiệp huyền huyễn trò chơi  « Quỷ Cốc Kỳ Đàm » bên trong, trở thành người người kính sợ Ma giáo thiếu chủ, có một vị gần như đương thời vô địch Ma giáo Giáo chủ tỷ tỷ, có thụ vị này Giáo chủ tỷ tỷ cưng chiều, yêu mến.

	Nhưng chỉ có Trần Thanh Sơn biết rõ, đây đều là giả.

	Hắn cái kia cái gọi là yêu mến hắn Giáo chủ tỷ tỷ, hận không thể đem hắn làm thành người trệ.

	Giáo chủ tỷ tỷ cừu địch nhóm, cũng từng cái đều mắt bốc lục quang mà nhìn chằm chằm vào hắn, muốn giết hắn báo thù.

	Trần Thanh Sơn: &#34;Chuyện cho tới bây giờ, tỷ. . . Chúng ta có thể cùng giải sao?&#34;

	Thẩm Lăng Sương cười lạnh: &#34;Vì mạng sống, ngay cả tỷ tỷ đều có thể hô ra miệng sao?&#34;

	Trần Thanh Sơn: &#34;. . .&#34;

	Có thể hay không một lần nữa lại xuyên qua một lần a!

	Coi như trở lại địa cầu cũng không tệ a.
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:47 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/422/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/422" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/1032" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/1032/poster.jpg?v=1770849031910" class="story-poster" alt="Mông Oan Nhập Ngục Phục Hình, Một Ngày Gây Án Mười Tám Lần" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/1032" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Mông Oan Nhập Ngục Phục Hình, Một Ngày Gây Án Mười Tám Lần
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Khí Thủy Bạn Đông Phong
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Đô thị
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													441 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												【 Đô thị + hệ thống + phía sau màn + báo thù + sảng văn + sát phạt quyết đoán 】

Trong vòng một đêm, thiên chi kiêu tử biến thành tù nhân. 

Sinh viên Lâm Mặc bị mưu hại là kinh thiên đại án thủ phạm, cửa nát nhà tan, bị đầu nhập cảnh giới sâm nghiêm nhất ngục giam! 

Tại vô tận tra tấn cùng trong tuyệt vọng, hắn đã thức tỉnh 【 tử sĩ thẩm phán hệ thống 】. 

Chỉ cần thẩm phán những cái kia pháp luật không cách nào chế tài tội ác, liền có thể thu hoạch được ban thưởng, thậm chí —— phục sinh người nhà! 

Từ đây, một cái có được hoàn mỹ không ở tại chỗ chứng minh phía sau màn thẩm phán giả ra đời. 

Giới kinh doanh cự ngạc ly kỳ chết bất đắc kỳ tử, dưới mặt đất hoàng đế bốc hơi khỏi nhân gian, một tay che trời gia tộc quyền quý sụp đổ...... 

Trị an hệ thống điên cuồng, lại vĩnh viễn nghĩ không ra, kẻ đầu têu chỉ là một tù nhân. 

Quyền quý đang sợ hãi bên trong muốn không khác biệt, diệt trừ tất cả có động cơ người, ngược lại bị Lâm Mặc dẫn đầu diệt trừ. 

Ai có thể hoài nghi một cái bị 24 giờ giám sát tù phạm đâu? Lâm Mặc nhìn xem camera, cùng bình thường một dạng mặt không biểu tình.
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:46 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/1032/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/1032" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/995" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/995/poster.jpg?v=1770813853959" class="story-poster" alt="Cái Này Phản Phái Người Nào Thích Làm Ai Làm, Ta Thi Công Chức Lên Bờ" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/995" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-success story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Dịch</span>
														
														Cái Này Phản Phái Người Nào Thích Làm Ai Làm, Ta Thi Công Chức Lên Bờ
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													A Châu
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Đô thị
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													213 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												【  phản sáo lộ + sảng văn + chính được phát tà + hơi một tí bắt người cả nhà + luật sư cũng bắt vào đi 】

	Xuyên qua màn kịch ngắn dung hợp thế giới, trở thành hào môn nhị thiếu, vẫn là trùm phản diện?

	Không, kích hoạt cảnh thần hệ thống Chu Thành trực tiếp thi công chức lên bờ! Chỉ cần lập công liền có thể thu hoạch được ban thưởng!

	Thế là, Chu Thành nhìn chằm chằm nam nữ chủ cùng các lớn vai phụ, ai dám phạm pháp liền trực tiếp bắt!

	Bạn gái trước khuê mật: &#34;Chu Thành, ta uống rượu đập một cỗ siêu xe, ngươi nếu là giúp ta bồi thường, ta cho ngươi một cái cơ hội.&#34;

	&#34;Đa tạ, ngươi bởi vì ý tổn hại người khác tài vật bị bắt, đa tạ ngươi cho cơ hội lập công!&#34;

	Thanh lãnh giáo hoa: &#34;Đệ đệ ta sắp tốt nghiệp, ngươi cho hắn hai tỷ, để hắn cả một đời áo cơm Vô Ưu.&#34;

	&#34;Thu được, ngươi đệ ăn cơm chùa, gây hấn gây chuyện, đã bị ta bắt giữ, về sau quốc gia bao ăn bao ở, cũng là áo cơm không lo.&#34;

	Tiểu muội: &#34;Ca, ngươi căn bản không hiểu hắn! Đây là tình yêu!&#34;

	&#34;Thật sao? Hắn đầu đường đua xe vượt đèn đỏ đùa nghịch, còn ăn cắp, ta là không hiểu hắn, nhưng ta hiểu hắn phạm pháp!&#34;

	&#34;Chờ một chút, ta chỉ là các nàng mời luật sư.&#34;

	&#34;Luật sư? Luật sư cũng đi vào!&#34;

	. . .

	【  ngươi bắt giữ tội phạm thành công, ban thưởng đỉnh tiêm cách đấu! 】

	【  ngươi hoàn thành nhiệm vụ, ban thưởng súng ống tinh thông! 】

	【. . . 】

	Màn kịch ngắn nhân vật chính? Nhân vật chính cũng muốn tuân theo luật pháp!
====================================
Ủng hộ mình tại số tài khoản
9935754403 ngân hàng Vietcombank nhé .
Ai cần cv bộ nào thì nhắn dưới bình luận nhá !!!!
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:46 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/995/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/995" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/411" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/411/poster.jpg?v=1770545383568" class="story-poster" alt="Cẩu Tại Loạn Võ Thế Giới Làm Địa Chủ" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/411" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Cẩu Tại Loạn Võ Thế Giới Làm Địa Chủ
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Nhất Thốn Hoan Hỉ
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Huyền huyễn
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													237 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Xuyên qua thành địa chủ nhà hài tử, không cần lên núi đi săn, trông coi hồ nước đánh cá, bản thân liền là đụng Đại Vận.

	Không ngờ, lại còn có phụ cấp hệ thống.

	 « Thiết Sơn Quyền » tu thành thời gian hai mươi năm, phụ cấp mười tám năm, còn thừa tu thành thời gian hai năm.

	Kiểm trắc đến một viên Khí Huyết đan, có thể tăng lên tiến độ tu luyện một tháng, phụ cấp hai tháng, thực tế tăng cường ba tháng, Thiết Sơn Quyền thực tế tu thành thời gian một năm chín tháng.

	Phụ cấp không chỉ là kỳ hạn rút ngắn, càng mang ý nghĩa vô luận tu luyện bất kỳ cái gì công pháp, đều có thể tại trong thời gian quy định tu thành.

	Tu thành —— tất thành!
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:43 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/411/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/411" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/687" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/687/poster.jpg?v=1770719154936" class="story-poster" alt="Khắc Học Điều Tra Viên Trong Conan" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/687" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Khắc Học Điều Tra Viên Trong Conan
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Ngư Bản Phi Ngư
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Đồng nhân
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													914 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Q: Luận khả năng mật thất giết người

	Kha học thám tử:

	1. Lợi dụng dây câu cá, băng dán, băng ghi hình các loại bố trí mật thất.

	2. Lợi dụng cơ quan, độc dược, độc trùng các loại hoàn thành trong mật thất giết người.

	3. Giết người sau đó ẩn giấu tại trong mật thất.

	. . .

	Khắc học điều tra viên:

	1. Lợi dụng thần thoại sinh vật hoàn thành giết người.

	2. Lợi dụng vu độc chú thuật hoàn thành giết người.

	. . .

	Quyển sách lại tên « nào đó không kha học điều tra viên », « liên quan tới ta tại kha học thế giới trở thành truyền kỳ điều tra viên chuyện này », « ta thân là một cái Hawaii người, nắm giữ ức chút kỹ năng, cái này rất hợp lý đi », « đồng thời ta thân là một cái mật đại nhân, hiểu rõ chút quỷ bí, cái này cũng rất bình thường đi »

	Ps: Chủ thể vẫn là Conan đồng nhân
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:43 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/687/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/687" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/1472" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/1472/poster.jpg?v=1771333799651" class="story-poster" alt="Hải Tặc: Không Ai So Ta Càng Hiểu Haoshoku" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/1472" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Hải Tặc: Không Ai So Ta Càng Hiểu Haoshoku
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Đường Miêu Hổ
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Đồng nhân
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													243 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Mạnh nhất Haoshoku + đại kiếm hào + trái Goro Goro no Mi

	Huyết thống, thiên phú, xuất thân tầm thường, ngươi dựa vào cái gì tự tin như vậy? Hai trăm lần cố gắng sao?

	Barzeb  ·  Seven: Lão tử có treo!

	Xuyên qua hải tặc thế giới, như thế nào tại một đám liều cha giàu Đệ nhị bên trong trổ hết tài năng?

	Đáp: Nhất thời bật hack nhất thời thoải mái, một mực bật hack một mực thoải mái.

	Bội đao: Mộng tưởng một lòng.
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:42 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/1472/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/1472" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/1640" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/1640/poster.jpg?v=1771565157707" class="story-poster" alt="Độc Tôn Tam Giới" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/1640" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-success story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Dịch</span>
														
														Độc Tôn Tam Giới
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Lê Thiên
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Tiên hiệp
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													3606 chương
												</span>
												<span class="text-danger" style="display: inline-block;">
													<i class="fas fa-check-circle" style="font-size: 11px;"></i>
													Hoàn thành
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Thiên Đế Chi Tử Giang Trần chuyển sinh lên thân thể một thiếu niên bị chư hầu khi dễ bắt đầu trên con đường đuổi giết máu tanh dần dần đi lên.

Trước mặt Giang Trần ai dám xưng là thiên tài? Không ai có thể hiểu Thiên bằng Thiên Đế Chi Tử.

Thiên tài? Kẻ thuận ta là thiên, kẻ nghịch ta phải giết!!
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:41 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/1640/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/1640" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/410" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/410/poster.jpg?v=1770545337333" class="story-poster" alt="Bắt Đầu Trở Thành Thủ Tọa, Đánh Dấu Cực Đạo Đế Binh!" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/410" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Bắt Đầu Trở Thành Thủ Tọa, Đánh Dấu Cực Đạo Đế Binh!
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Sách Đản Chuyên Gia
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Huyền huyễn
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													2390 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
													[ nhẹ nhõm + thường ngày + vô địch + không nữ chủ + bức cách tràn đầy ]

	Bởi vì chết qua một lần, Hoa Vân Phi vẫn luôn đem sống sót đặt ở đệ nhất vị, cẩu thả tại Đạo Nguyên phong 100 năm, đánh dấu 100 năm.

	[ keng, đánh dấu 100 năm cả, chúc mừng kí chủ thu hoạch được Cực Đạo Đế binh —— Hỗn Độn chung ]

	. . .

	Vạn năm sau, hắc ám huyết thời đại tiến đến, thiên địa đại loạn, Chí Tôn giáng lâm, Cực Đạo Đế binh đánh tan nát, 1 vị Chí Tôn đi tới Kháo Sơn Tông mượn đi 100 kiện Cực Đạo Đế binh, ngẩng đầu ưỡn ngực vọt tới vũ trụ không trung rống to: &#34;Ai dám cùng ngươi bản tôn một trận chiến?&#34;

	. . .

	Thế nhân cái này mới biết được, Kháo Sơn Tông có bao nhiêu cẩu thả, một mực đang ẩn giấu thực lực!

	. . .


											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:41 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/410/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/410" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/1635" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/1635/poster.jpg?v=1771504362493" class="story-poster" alt="Kinh Dị Nhạc Viên" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/1635" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Kinh Dị Nhạc Viên
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Tam Thiên Lưỡng Giác
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Khoa huyễn
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													726 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Đây là siêu việt chiều không gian trò chơi.

Cũng là cuộc tranh giành truy tìm chân lý.

Không biết phong ấn, quỷ thần đánh cược......

Số liệu chống lại, nhân loại cứu rỗi......

Tại cái kia kết nối lấy thực tế thế giới giả tưởng —— Ý thức quyết định chúng ta, ý thức lựa chọn chúng ta, ý thức quyết định ý thức của chúng ta.

Bây giờ, vứt bỏ sợ hãi của ngươi.

Vứt bỏ ngươi tư tâm tạp niệm, nghi vấn cùng cự tin......

Giải phóng tư tưởng của ngươi.

Hoan nghênh đi tới《 Kinh Dị Nhạc Viên 》

											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:41 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/1635/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/1635" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/1700" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/1700/poster.jpg?v=1771569562708" class="story-poster" alt="70 Lão Đại Vợ Trước Mang Thai Chạy" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/1700" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														70 Lão Đại Vợ Trước Mang Thai Chạy
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Đăng Tâm Tùng Lam
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Hiện đại
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													0 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Xuống nông thôn thanh niên trí thức Lâm Tri Vi vì hồi Bắc Kinh, liền cùng tân hôn một năm tình cảm chính nùng trượng phu Chu Dịch ly hôn. 

Ly hôn sau một tháng, nàng ôm bụng phát hiện mình giống như. . . Mang thai. 

Mà đổi thành một bên, nữ phụ Lý Lệ đang chờ Chu Dịch ly hôn —— nàng là trọng sinh, nàng biết Chu Dịch là tương lai quát tháo Bằng Thành lão đại.
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:38 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/1700/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/1700" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/1158" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/1158/poster.jpg?v=1771032454681" class="story-poster" alt="Lạn Kha Kỳ Duyên" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/1158" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-success story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Dịch</span>
														
														Lạn Kha Kỳ Duyên
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Chân Phí Sự
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Tiên hiệp
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													24 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Lạn Kha và Khởi Đầu Mới của Kế Duyên
Lạn Kha lặng lẽ ngồi bên ván cờ rụng lá, đối diện với lão thụ cô độc giữa không gian tĩnh mịch. Ván cờ tưởng chừng vô tận, tượng trưng cho những suy tư sâu sắc và cuộc đối thoại thầm lặng với chính mình.

Vòng Luẩn Quẩn và Sự Thức Tỉnh
Hưng sở trí thiên nguyên, một nước cờ mang tầm vóc vũ trụ, nhưng ngay sau đó, Lạn Kha lại quay đầu nhìn về sơn hải mênh mông, một thế giới bao la và đầy bí ẩn. Sự chuyển hướng này gợi mở về một hành trình mới, một sự khám phá không ngừng nghỉ.

Kế Duyên: Từ Hành Khất Đến Nền Tảng Mới
Khi tỉnh giấc sau giấc ngủ dài, Kế Duyên phát hiện mình đã trở thành một hành khất nửa mù, trú ngụ trong một Sơn Thần Miếu đổ nát. Hoàn cảnh khắc nghiệt buộc Kế Duyên phải tìm kiếm những phương tiện để sinh tồn và thích nghi với thế giới mới đầy rẫy hiểm nguy.

Sức Mạnh Từ Những Điều Khiêm Tốn
Dù thực lực còn hạn chế, Kế Duyên vẫn tìm thấy những nguồn lực quý giá để tự bảo vệ mình. Miệng pháo dù không mạnh mẽ, nhưng đủ để gom góp những nhu yếu phẩm cần thiết. Thanh kiếm của Chân Nhân và cái miệng của Thần Côn trở thành những công cụ hỗ trợ đắc lực, giúp Kế Duyên xây dựng nền tảng vững chắc trong thế giới đáng sợ này.

Với những gì hiện có, Kế Duyên bắt đầu hành trình an thân lập nghiệp, tìm kiếm con đường riêng trong một thế giới đầy biến động và thử thách.
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:38 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/1158/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/1158" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/419" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/419/poster.jpg?v=1770546192424" class="story-poster" alt="Vô Địch Nữ Lệ Quỷ Có Chút Yêu Đương Não" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/419" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Vô Địch Nữ Lệ Quỷ Có Chút Yêu Đương Não
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Ngũ Quan Tuyệt Trần
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Huyền huyễn
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													204 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Lục Viễn xuyên qua đến quỷ dị thế giới thành một tên tiểu đạo sĩ.

	Dựa vào hệ thống 【  trảm yêu trừ ma 】 tại quan ngoại khu vực này có chút danh tiếng.

	Mà tại có một ngày đi công việc lúc, gặp được một lẻ loi trơ trọi mộ phần, Lục Viễn tiến lên liếc nhìn.

	&#34;Hai mươi tuổi liền chết, chà đạp, đến nén nhang đi...&#34;

	Từ đó về sau, Lục Viễn liền bị nữ Lệ Quỷ quấn lên...
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:37 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/419/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/419" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/409" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/409/poster.jpg?v=1770545306474" class="story-poster" alt="Trời Sinh Thần Lực, Lấy Bạo Chế Bạo, Giang Hồ Phá Phòng" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/409" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Trời Sinh Thần Lực, Lấy Bạo Chế Bạo, Giang Hồ Phá Phòng
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Tái Nhập Giang Hồ
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Huyền huyễn
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													478 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Hồn xuyên dị giới, đạt được khoái ý ân cừu hệ thống, chỉ cần làm việc không vi phạm bản tâm, liền có thể đạt được liên tục không ngừng ban thưởng.

	Vừa lên đến Trần Huyền liền được 【  trời sinh thần lực 】 thiên phú.

	Bị người oan uổng làm sao bây giờ? Đánh lại!

	Bị người khất nợ tiền công làm sao bây giờ? Đánh lại!

	Bị mỹ nữ câu dẫn làm sao bây giờ? Đương nhiên là liền nàng cùng lúc làm sạch!

	Ai bảo nàng như thế thiếu? Dám câu dẫn lão tử!

	Người tại dị giới, lấy bạo chế bạo!

	Khoái ý ân cừu, bên trong tâm thư thoải mái!

	Muốn chính là toàn diện nghiền ép! Triệt để nghiền ép!

	Chính là không thể biệt khuất chính mình mảy may!

	Toàn bộ giang hồ oanh động.

	Các phương thiên kiêu: &#34;Ta cũng không biết rõ a, ta chỉ là tùy tiện nói hai câu nói, hắn liền thẳng đến ta giết tới.&#34;

	Mạo mỹ thiếu nữ: &#34;Trần Huyền hắn không phải người, hắn thế mà đánh nữ nhân, dứt bỏ sự thật không nói, hắn chẳng lẽ liền không có sai à. . .&#34;

	Các phương danh túc: &#34;Hậu sinh khả uý, thật sự là hậu sinh khả uý, Trần Huyền hắn có thể động thủ, tuyệt đối sẽ không loạn bức bức, làm ngươi nhìn thấy Trần Huyền cau mày thời điểm, ngươi tốt nhất còn thành thật hơn một điểm.&#34;

	. . .

	Đây là một thống khoái đến cực điểm, nhẹ nhàng vui vẻ lâm ly cố sự!

	Làm người khác còn tại hèn mọn phát dục thời điểm, Trần Huyền đã nhanh ý ân cừu, nhanh thông cao vũ.

	Thiên kiêu?

	Lão tử đánh chính là thiên kiêu!
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:34 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/409/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/409" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/391" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/391/poster.jpg?v=1770542543312" class="story-poster" alt="Chư Thiên Lãnh Chúa" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/391" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Chư Thiên Lãnh Chúa
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Lại Điểu
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Huyền huyễn
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													443 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												
&#34;Đích! Nhất tinh nông phu thẻ!&#34;

	&#34;Khóa lại tấm thẻ này, nhưng chuyển chức làm thực tập nông phu, cũng thu hoạch được chức nghiệp thiên phú —— chỗ trồng trọt thổ địa phì nhiêu độ bị động gia tăng 30%!&#34;

	——

	&#34;Đích! Nhất tinh thợ săn thẻ!&#34;

	&#34;Khóa lại tấm thẻ này, nhưng chuyển chức làm thực tập thợ săn, cũng thu hoạch được chức nghiệp thiên phú —— sử dụng vũ khí tầm xa độ chính xác bị động gia tăng 30%!&#34;

	——

	Tập hợp đủ chín cái cơ sở thẻ, nhưng trở thành chư thiên lãnh chúa, cướp đoạt vạn giới!
------------------------------------------

											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:32 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/391/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/391" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/1642" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/uploads/anh-bia.png" class="story-poster" alt="Dư Tẫn Chi Thương" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/1642" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Dư Tẫn Chi Thương
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Andlao
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Huyền huyễn
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													0 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Mấy khúc du dương giai điệu hạ, sương mù bao phủ kiến trúc chậm rãi lộ ra chân dung, theo động cơ hơi nước oanh minh vận chuyển, u ám vũng bùn, ngươi lừa ta gạt, tam giáo cửu lưu Old Dunling đập vào mặt.

Trong bóng tối vặn vẹo huyết nhục giãy dụa nhúc nhích, trong đường cống ngầm mang theo dịch bệnh đàn chuột bốn đằng bôn tẩu.

Tại này quỷ dị dữ tợn thành thị bên trong, siêu phàm lực lượng tại ngày càng thức tỉnh, tất cả mọi người biết rõ thế giới tại dần dần sụp đổ, chớ đừng nói chi là tại ở trong đó còn có một đoàn chưa giải nghi ngờ, một phần chưa kết thúc oan án.

Tiếng vó ngựa dồn dập hạ cùng vạn chúng trong chờ mong, một vị vội vàng chạy tới, có chút tố chất thần kinh đại thám tử vứt bỏ trong tay đầu mẩu thuốc lá, đương nhiên hắn vẫn như cũ mang theo hắn cái kia thanh thân yêu Winchester, nhíu mày phun ra một đoàn khói trắng.

&#34;Ngươi tốt, ta gọi Lorenzo Holmes, một vị xuất sắc thám tử, xin hỏi ta có gì có thể đến giúp ngươi sao?

(quyển sách lại tên « nhị lưu thám tử cùng hắn thân yêu Winchester »)
----------------------------------------------------------------------------------------------------
Truyện đã full
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:26 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/1642/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/1642" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/1095" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/1095/poster.jpg?v=1770895583014" class="story-poster" alt="Trẫm, Đều Là Vì Đại Hán!" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/1095" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Trẫm, Đều Là Vì Đại Hán!
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Nhất Thiên Tả Tam Chương
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Cổ đại
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													710 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Hậu thế nhà lịch sử học mặc dù đều tán đồng Lưu Mạc tam hưng Hán thất công tích, nhưng cùng lúc cũng đối Lưu Mạc một ít tập tục xấu giúp cho phê bình.

	Đối với cái này, Lưu Mạc đương nhiên là có lời muốn nói!

	&#34;Tốt, kia Trẫm hỏi ngươi.&#34;

	&#34;Trẫm mặc dù là cái người xuyên việt, vẫn là Hán thất dòng họ. Nhưng là trẫm nhân cách mị lực có thể sánh bằng Lưu Bị cái kia mị ma sao? Hả?&#34;

	&#34;Trẫm hỏi ngươi, Trẫm nếu như không phải cưới Lục Tốn, Lữ Mông, Tôn Sách mẹ của bọn hắn, bọn họ có thể khăng khăng một mực vì Trẫm bán mạng sao? Hả?&#34;

	&#34;Ngươi trước đừng quản có được hay không nhân thê, Trẫm liền hỏi ngươi, đại hán này đến cùng có hay không tam hưng? Hả? Trả lời Trẫm! Nhìn xem trẫm đôi mắt trả lời Trẫm!&#34;

	Đối với hết thảy nói xấu, Lưu Mạc đều giúp cho phủ nhận!

	&#34;Trẫm lặp lại lần nữa! Trẫm làm như thế, đều là vì trung hưng Hán thất!&#34;

Cvt: Đọc quen các main khởi đầu ở Lương, U, Tịnh, Từ, Duyện Châu quen rồi nay thấy bộ này main khởi nghiệp ở Giang Đông đọc thấy khá ok.  Bộ này main tận dụng những cái có sẵn để chiêu mộ nhân tài xung quanh về phò tá mình , sau đó lợi dụng uy thế của Viên Thuật chiếm Giang Đông phát triển thế lực của mình , chứ ko giống mấy bộ khác xuyên việt cái là cắm đầu đi chiêu mộ danh tướng danh thần, ko có quan tâm địa bàn của mình , đọc càng về sau càng chán vì danh thần danh tướng bị gom về 1 phe hết, bộ này nếu giữ được phong cách kiểu này thì về sau có lẽ sẽ có các trận đấu trí đấu võ hay.

Ps: Main giống như Tào tặc nhưng còn hơn cả Tào tặc , Tào Tháo còn ko dám lấy quả phụ về làm thiếp nhưng main thì dám , mà lại không chỉ 1 người. Đao hữu nào thích thể loại này có thể nhảy hố , tại hạ dưới hố đón chào các đồng đạo.

Ps1: Truyện không có hệ thống , truyện không có hệ thống , truyện không có hệ thống, điều quan trọng nói 3 lần.

☆★☆ ỦNG HỘ ĐỂ TA CÓ ĐỘNG LỰC CV NHÉ! ☆★☆

Các bạn ủng hộ bằng 2 phương thức:
✓ Đánh giá truyện.
✓ tặng hoa
Chân thành cảm ơn!
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:24 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/1095/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/1095" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/533" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/533/poster.jpg?v=1770647295672" class="story-poster" alt="Tokyo: Ta Vua Màn Ảnh Thanh Trang Bị" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/533" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-secondary story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Convert</span>
														
														Tokyo: Ta Vua Màn Ảnh Thanh Trang Bị
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Cẩm Mộc Chi Tâm
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Hiện đại
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													163 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Năm 1988, Tokyo thời kỳ bong bong đang thịnh. Sau khi sống lại Kitahara Shin nắm giữ một trương túi da tốt cùng kiếp trước trui luyện tinh xảo diễn kỹ, lại bởi vì khuyết thiếu &#34;Khí chất ngôi sao&#34; tại giới giải trí nửa bước khó đi.

Mãi đến đêm khuya, hắn ở trước máy bán hàng tự động cho mượn cái bật lửa, nhặt được &#34;Đời đầu ca sĩ&#34; Nakamori Akina tiện tay vứt bỏ ngân sắc Zippo.

【 trang bị: Ca sĩ thương tâm cái bật lửa (màu tím)】【 thu được thuật ngữ: Confessions of a Mask —— ngươi trầm mặc đinh tai nhức óc, cảm giác vỡ vụn kéo căng. 】

Từ đây, hiện thực vật phẩm trong mắt hắn đã có được thuộc tính.

Dựa vào trang bị ban cho cực hạn &#34;Chất điện ảnh&#34;, hắn từ diễn viên quần chúng từng bước một đi hướng vua màn ảnh thần đàn.

Nakamori cái bật lửa, Matsushima microphone, Sakai áo cao bồi... 

Hắn là màn bạc bên trên thiên diện vua màn ảnh, cũng là những thứ này tỏ rõ cùng các nữ thần, tại trong niên đại táo bạo duy nhất đồng phạm cùng an ủi.

	&#34;Đừng sợ, bí mật của ngươi, chỉ có ta biết.&#34;
											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:23 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/533/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/533" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                                <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
									<a href="/truyen/524" class="story-poster-container" style="flex-shrink: 0;">
										<img src="/stories/524/poster.jpg?v=1770775379457" class="story-poster" alt="Thực Tế Ảo: Thống Lĩnh Quân Đoàn Hắc Ám" style="height: 120px; width: 85px; object-fit: cover;">
									</a>
									
									<div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
										<div>
											<div class="story-header">
												<div>
													<a href="/truyen/524" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
														
															<span class="badge bg-danger story-type-badge" style="font-size: 10px; padding: 2px 5px; margin-right: 5px;">Sáng tác</span>
														
														Thực Tế Ảo: Thống Lĩnh Quân Đoàn Hắc Ám
													</a>
												</div>
											</div>
											
											<div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-user-edit"></i>
													Cơm Cá Mú
												</span>
												<span style="margin-right: 10px; display: inline-block;">
													<i class="fas fa-tag"></i>
													Võng du
												</span>
                                                <span style="margin-right: 10px; display: inline-block;">
													<i class="fa-solid fa-list-ol"></i>
													196 chương
												</span>
												<span class="text-success" style="display: inline-block;">
													<i class="fas fa-spinner" style="font-size: 11px;"></i>
													Đang ra
												</span>
											</div>

											<div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
												Game thực tế ảo &#39;Chiến Phạt&#39; ra mắt và làm chấn động toàn cầu. Một thanh niên mải mê chơi game này đang trở thành cơn sốt trong cộng đồng game thủ toàn cầu.


											</div>
										</div>

										<div class="story-footer">
											<div class="story-updated" style="font-size: 11px; color: #888;">
												<i class="far fa-clock me-1"></i>
												Cập nhật: 13:13 20/02/2026
											</div>
											<div class="story-actions">
												<a href="/doc-truyen/524/chuong/1" class="btn btn-read">
													<i class="fas fa-book-open me-1"></i>Đọc truyện
												</a>
												
												<a href="/truyen/524" class="btn btn-detail">
													<i class="fas fa-info-circle me-1"></i>Chi tiết
												</a>
											</div>
										</div>
									</div>
								</div>
                            
                        
                    </div>
					<div id="pagination-container">
						
							<nav aria-label="Page navigation">
								<ul class="pagination">
									<li class="page-item disabled">
										<button class="page-link" onclick="applyFilter('page', 0)" disabled>
											<i class="fas fa-chevron-left"></i>
										</button>
									</li>

									
										
											<li class="page-item active">
												<button class="page-link" onclick="applyFilter('page', 1)">
													1
												</button>
											</li>
										
									
										
											<li class="page-item ">
												<button class="page-link" onclick="applyFilter('page', 2)">
													2
												</button>
											</li>
										
									
										
											<li class="page-item ">
												<button class="page-link" onclick="applyFilter('page', 3)">
													3
												</button>
											</li>
										
									
										
											<li class="page-item disabled"><span class="page-link">...</span></li>
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
									
										
											<li class="page-item ">
												<button class="page-link" onclick="applyFilter('page', 66)">
													66
												</button>
											</li>
										
									

									<li class="page-item ">
										<button class="page-link" onclick="applyFilter('page', 2)" >
											<i class="fas fa-chevron-right"></i>
										</button>
									</li>
								</ul>
							</nav>
						
					</div>
                </div>
            </div>

        </div>
    </div>
		<footer class="bg-white border-top mt-5 pt-5 pb-4">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-4 text-center d-flex flex-column align-items-center mb-4 mb-md-0">
                <a href="/">
                    <img src="/uploads/ten.png" alt="Tiệm Truyện Chữ" class="img-fluid mb-3" style="max-height: 80px; object-fit: contain;">
                </a>
                
                <div class="d-flex gap-4 mt-3 justify-content-center align-items-center">
    
					<a href="https://www.facebook.com/tiemtruyenchu" class="social-btn fb-btn">
						<i class="fab fa-facebook"></i> 
						<span>Facebook</span>
					</a>

					<a href="https://www.tiktok.com/@tiemtruyenchu" class="social-btn tiktok-btn">
						<i class="fab fa-tiktok"></i> 
						<span>TikTok</span>
					</a>

					<a href="#" class="social-btn support-btn" data-bs-toggle="modal" data-bs-target="#supportModal">
						<i class="fas fa-headset"></i> 
						<span>Hỗ trợ</span>
					</a>

				</div>
            </div>

            <div class="col-lg-9 col-md-8">
                <div class="row mb-3 text-uppercase fw-bold small text-center text-md-start">
                    <div class="col-lg-3 col-6 mb-2">
						<a href="#" class="text-dark text-decoration-none hover-purple" data-bs-toggle="modal" data-bs-target="#termsModal">
							Điều khoản dịch vụ
						</a>
					</div>
                    <div class="col-lg-3 col-6 mb-2">
						<a href="#" class="text-dark text-decoration-none hover-purple" data-bs-toggle="modal" data-bs-target="#privacyModal">
							Chính sách bảo mật
						</a>
					</div>
					<div class="col-lg-3 col-6 mb-2">
						<a href="#" class="text-dark text-decoration-none hover-purple" data-bs-toggle="modal" data-bs-target="#copyrightModal">
							Quy định về bản quyền
						</a>
					</div>
                    <div class="col-lg-3 col-6 mb-2">
						<a href="#" class="text-dark text-decoration-none hover-purple" data-bs-toggle="modal" data-bs-target="#guideModal">
							Hướng dẫn sử dụng
						</a>
					</div>
                    
                </div>

                <div class="text-muted small" style="line-height: 1.8; text-align: justify;">
                    <p class="mb-0">
                        Tiệm Truyện Chữ là góc nhỏ bình yên với slogan: "Tựa vào con chữ, ngủ một giấc ngon". Chúng tôi kết nối đam mê thông qua kho nội dung đa dạng, từ những bản dịch tâm huyết, truyện sáng tác mới mẻ đến những tác phẩm convert được sưu tầm và lưu giữ lâu năm. Tại đây, độc giả có thể cùng đọc, đóng góp nội dung và chia sẻ cảm xúc một cách tự nhiên. Tiệm hướng đến việc xây dựng một cộng đồng gần gũi, nơi mỗi trang truyện đều là liều thuốc tinh thần vỗ về tâm hồn bạn sau những giờ làm việc mệt mỏi.
                    </p>
                </div>
            </div>
        </div>
    </div>
	
	<div class="modal fade" id="supportModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content border-0 shadow-lg" style="border-radius: 15px; overflow: hidden;">
				
				<div class="modal-header text-white border-0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
					<h5 class="modal-title fw-bold">
						<i class="fas fa-shield-alt me-2"></i> Liên hệ & Bản quyền
					</h5>
					<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>

				<div class="modal-body p-4 text-center">
					<div class="mb-4">
						<img src="/uploads/ten.png" alt="Logo" style="height: 60px; object-fit: contain;">
					</div>

					<p class="text-muted" style="font-size: 0.95rem; line-height: 1.6; text-align: justify;">
						Chúng tôi luôn sẵn sàng lắng nghe và giải quyết các vấn đề liên quan đến bản quyền một cách minh bạch. 
						Nếu bạn phát hiện bất kỳ nội dung nào vi phạm quyền sở hữu trí tuệ của mình trên hệ thống, 
						vui lòng liên hệ trực tiếp qua email:
					</p>

					<div class="mt-4 p-3 rounded" style="background-color: #f8f9fa; border: 2px dashed #6f42c1;">
						<div class="fw-bold text-secondary mb-1">EMAIL LIÊN HỆ</div>
						<a href="/cdn-cgi/l/email-protection#51222421213e2325112538343c25232428343f3239247f323e3c" class="fw-bold fs-5 text-decoration-none" style="color: #6f42c1;">
							<i class="fas fa-envelope me-2"></i><span class="__cf_email__" data-cfemail="8af9fffafae5f8fecafee3efe7fef8fff3efe4e9e2ffa4e9e5e7">[email&#160;protected]</span>
						</a>
					</div>
				</div>

				<div class="modal-footer border-0 justify-content-center pb-4">
					<button type="button" class="btn btn-secondary px-4 rounded-pill" data-bs-dismiss="modal">Đã hiểu</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="termsModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"> <div class="modal-content border-0 shadow-lg" style="border-radius: 15px; overflow: hidden;">
				
				<div class="modal-header text-white border-0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
					<h5 class="modal-title fw-bold">
						<i class="fas fa-file-contract me-2"></i> ĐIỀU KHOẢN DỊCH VỤ
					</h5>
					<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>

				<div class="modal-body p-4" style="text-align: justify; line-height: 1.6; color: #4A3B55;">
					
					<div class="mb-4 fst-italic text-center text-muted">
						Chào mừng bạn đến với <strong>Tiệm Truyện Chữ</strong> – góc nhỏ bình yên với thông điệp: 
						"Tựa vào con chữ, ngủ một giấc ngon". Khi truy cập và sử dụng dịch vụ tại website, 
						bạn đồng ý tuân thủ các quy định dưới đây. Quy định này áp dụng cho tất cả đối tượng bao gồm 
						khách truy cập, thành viên, tác giả, dịch giả và quản trị viên.
					</div>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">1. Định nghĩa các bên</h6>
					<ul class="list-unstyled">
						<li class="mb-2">
							<i class="fas fa-caret-right text-primary me-2"></i>
							<strong>Tiệm Truyện Chữ (Sau đây gọi là "Tiệm"):</strong> Nền tảng cung cấp dịch vụ đọc và đăng tải truyện trực tuyến.
						</li>
						<li class="mb-2">
							<i class="fas fa-caret-right text-primary me-2"></i>
							<strong>Người dùng (KH):</strong> Cá nhân sử dụng dịch vụ của Tiệm trên internet dưới mọi hình thức.
						</li>
					</ul>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">2. Tiêu chuẩn cộng đồng và hành vi người dùng</h6>
					<p>Để duy trì không gian đọc truyện văn minh, Tiệm nghiêm cấm các hành vi sau:</p>
					<ul>
						<li>Sử dụng từ ngữ gay gắt, đả kích, xúc phạm cá nhân hoặc tổ chức.</li>
						<li>Phát tán thông tin bất hợp pháp, bôi nhọ, sỉ nhục, hoặc nội dung trái với chuẩn mực đạo đức xã hội.</li>
						<li>Truyền bá phần mềm độc hại, virus, hoặc tận dụng lỗi (bugs) nhằm phá hoại sự ổn định của hệ thống.</li>
						<li>Spam tin nhắn, bình luận, bài viết hoặc dẫn link quảng bá các website, dịch vụ khác dưới mọi hình thức.</li>
						<li>Sử dụng ảnh đại diện (avatar) chứa nội dung tục tĩu, vi phạm pháp luật hoặc gây ảnh hưởng tiêu cực đến trải nghiệm của người khác.</li>
					</ul>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">3. Quy định về Bình luận và Đánh giá</h6>
					<ul>
						<li>Toàn bộ đánh giá và bình luận phải sử dụng tiếng Việt có dấu.</li>
						<li>Nội dung bình luận phải liên quan đến truyện. Các đánh giá khen/chê chung chung không mang lại giá trị hoặc có điểm số sai lệch với nội dung sẽ bị xóa bỏ.</li>
					</ul>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">4. Quy định về Đăng tải nội dung (Tác giả/Dịch giả)</h6>
					<ul>
						<li class="mb-2"><strong>Nội dung cấm:</strong> Tuyệt đối không đăng tải các tác phẩm liên quan đến chính trị, tôn giáo, tình dục, sắc hiệp, dâm hiệp hoặc nội dung nói xấu Việt Nam.</li>
						<li class="mb-2"><strong>Quyền sở hữu:</strong> Bạn cam kết chỉ đăng truyện do mình tự sáng tác hoặc có quyền sử dụng hợp pháp. Hành vi phát tán tác phẩm văn học trái phép là vi phạm pháp luật và sẽ bị xử lý nghiêm.</li>
						<li class="mb-2"><strong>Hình thức:</strong> Giới thiệu và chương truyện phải được phân đoạn rõ ràng. Nội dung trình bày dưới dạng khối chữ dày đặc sẽ bị biên tập lại hoặc xóa bỏ.</li>
						<li class="mb-2"><strong>Hình ảnh:</strong> Ảnh bìa không chứa nội dung khiêu dâm, kích dục, thù hằn hoặc các biểu tượng bị cấm bởi pháp luật.</li>
					</ul>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">5. Bản quyền và Khai thác thương mại</h6>
					<ul>
						<li>Bản quyền truyện thuộc về cá nhân người đăng. Tiệm không có nghĩa vụ đăng ký bản quyền hộ bạn.</li>
						<li>Bằng việc đăng tải truyện lên hệ thống, bạn cho phép Tiệm quyền khai thác quảng cáo và quyền thu hộ phí (mở khóa) chương truyện trên các tác phẩm đó.</li>
						<li>Nghiêm cấm hành vi sao chép nội dung thu phí của Tiệm ra bên ngoài khi chưa có sự đồng ý bằng văn bản. Tài khoản vi phạm sẽ bị khóa vĩnh viễn.</li>
					</ul>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">6. Chính sách liên kết và Tiếp thị (Affiliate)</h6>
					<ul>
						<li>Tiệm có thể hiển thị các liên kết tiếp thị sản phẩm (affiliate) phù hợp để duy trì hoạt động trang web.</li>
					</ul>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">7. Hình thức xử lý vi phạm</h6>
					<ul>
						<li>Ban quản trị có quyền tự đề ra mức phạt cho từng hành vi vi phạm.</li>
						<li>Thành viên vi phạm có thể bị xóa nội dung hoặc khóa tài khoản vĩnh viễn mà không cần thông báo trước.</li>
						<li>Tiệm có quyền thay đổi các quy định này bất cứ lúc nào để phù hợp với thực tế vận hành và quy định pháp luật.</li>
					</ul>
					
					<div class="alert alert-light border mt-4 text-center">
						Mọi thắc mắc và đóng góp, vui lòng liên hệ với đội ngũ Quản trị viên của Tiệm Truyện Chữ.
					</div>
				</div>

				<div class="modal-footer border-0 justify-content-center pb-3 pt-0">
					<button type="button" class="btn btn-primary px-5 rounded-pill" data-bs-dismiss="modal" style="background-color: #6f42c1; border: none;">
						Tôi đã hiểu và Đồng ý
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="privacyModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
			<div class="modal-content border-0 shadow-lg" style="border-radius: 15px; overflow: hidden;">
				
				<div class="modal-header text-white border-0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
					<h5 class="modal-title fw-bold">
						<i class="fas fa-user-shield me-2"></i> CHÍNH SÁCH BẢO MẬT
					</h5>
					<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>

				<div class="modal-body p-4" style="text-align: justify; line-height: 1.6; color: #4A3B55;">
					
					<div class="mb-4 fst-italic text-center text-muted border-bottom pb-3">
						Tại <strong>Tiệm Truyện Chữ</strong>, chúng tôi tôn trọng quyền riêng tư và cam kết bảo vệ dữ liệu cá nhân của bạn. 
						Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin khi bạn tham gia các hoạt động tại hệ thống website của chúng tôi.
					</div>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">1. Cam kết về Thông tin cá nhân</h6>
					<p>
						Chúng tôi đảm bảo không tiết lộ địa chỉ email hoặc bất kỳ thông tin định danh cá nhân nào khác cho bên thứ ba. 
						Tuy nhiên, chúng tôi có quyền cung cấp thông tin này trong trường hợp người dùng có hành vi vi phạm nghiêm trọng 
						nội quy của Tiệm hoặc theo yêu cầu hợp pháp từ cơ quan chức năng để xử lý vi phạm.
					</p>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">2. Dữ liệu Vị trí và Cải thiện Dịch vụ</h6>
					<p>Hệ thống có thể thu thập dữ liệu về vị trí của bạn để tối ưu hóa tốc độ tải trang và hiển thị nội dung phù hợp nhất. Quy trình này được thực hiện hoàn toàn tự động và chúng tôi cam kết:</p>
					<ul class="list-unstyled ms-2">
						<li class="mb-2"><i class="fas fa-check-circle text-success me-2 small"></i>Không chia sẻ dữ liệu vị trí cụ thể của bạn cho bên thứ ba.</li>
						<li class="mb-2"><i class="fas fa-check-circle text-success me-2 small"></i>Chỉ sử dụng thông tin này nhằm mục đích cải thiện chức năng và trải nghiệm người dùng trên website.</li>
					</ul>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">3. Lưu trữ Hoạt động Công khai</h6>
					<p>Để phục vụ việc kết nối cộng đồng và theo dõi lịch sử đọc truyện, hệ thống sẽ lưu trữ các hoạt động mang tính công khai của thành viên, bao gồm:</p>
					<ul>
						<li class="mb-2"><strong>Hoạt động về truyện:</strong> Lịch sử đọc, chương truyện đã xem, các bộ truyện yêu thích và các đóng góp (dịch, convert, sáng tác).</li>
						<li class="mb-2"><strong>Hoạt động tài khoản:</strong> Các tương tác, bình luận và đánh giá công khai trên nền tảng.</li>
					</ul>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">4. Trách nhiệm về Thông tin Công khai</h6>
					<p>Hầu hết các thông tin bạn nhập vào website (như nội dung bình luận, đánh giá truyện, giới thiệu tác giả) đều được hiển thị công khai cho mọi độc giả. Do đó:</p>
					<ul>
						<li class="mb-2">Người dùng cần cân nhắc kỹ trước khi chia sẻ các thông tin cá nhân nhạy cảm trong phần nội dung công khai.</li>
						<li class="mb-2">Tiệm Truyện Chữ không chịu trách nhiệm về việc giữ tính riêng tư đối với các thông tin mà người dùng đã chủ động đăng tải công khai trên hệ thống.</li>
					</ul>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">5. Tuân thủ quy định năm 2026</h6>
					<div class="bg-light p-3 rounded border-start border-4 border-primary">
						<p class="mb-0">
							Chúng tôi thực hiện nghiêm túc các quy định về bảo vệ dữ liệu cá nhân. Theo luật định năm 2026, 
							Tiệm cam kết <strong>không yêu cầu</strong> người dùng cung cấp hình ảnh hoặc video chứa nội dung giấy tờ tùy thân (CCCD/Hộ chiếu) 
							để xác thực tài khoản thông thường. Mọi thông tin thanh toán (nếu có) sẽ được xử lý qua các cổng bảo mật chuẩn quốc tế.
						</p>
					</div>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">6. Thay đổi Chính sách</h6>
					<p>
						Nội dung của Chính sách bảo mật này có thể được điều chỉnh để phù hợp với thực tế vận hành và các thay đổi của pháp luật. 
						Mọi cập nhật sẽ được hiển thị trực tiếp trên trang này.
					</p>
					
					<div class="text-center mt-5 pt-3 border-top">
						<p class="fst-italic fw-bold text-primary mb-1">Tiệm Truyện Chữ - "Tựa vào con chữ, ngủ một giấc ngon".</p>
						<p class="small text-muted">Cảm ơn bạn đã tin tưởng tham gia cộng đồng của chúng mình!</p>
					</div>
				</div>

				<div class="modal-footer border-0 justify-content-center pb-3 pt-0">
					<button type="button" class="btn btn-secondary px-5 rounded-pill" data-bs-dismiss="modal">Đóng</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="copyrightModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
			<div class="modal-content border-0 shadow-lg" style="border-radius: 15px; overflow: hidden;">
				
				<div class="modal-header text-white border-0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
					<h5 class="modal-title fw-bold">
						<i class="fas fa-copyright me-2"></i> QUY ĐỊNH VỀ BẢN QUYỀN
					</h5>
					<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>

				<div class="modal-body p-4" style="text-align: justify; line-height: 1.6; color: #4A3B55;">
					
					<div class="mb-4 fst-italic text-center text-muted border-bottom pb-3">
						Tại <strong>Tiệm Truyện Chữ</strong>, chúng tôi luôn ý thức rõ ràng và cam kết tôn trọng quyền sở hữu trí tuệ 
						của các tác giả, tác phẩm và mọi sản phẩm trí tuệ khác theo quy định của pháp luật.
					</div>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">1. Bản chất nền tảng</h6>
					<p>
						Tiệm Truyện Chữ vận hành như một nền tảng mở cho cộng đồng. Mọi thành viên đều có quyền đăng tải các tác phẩm 
						do mình tự sáng tác hoặc tham gia dịch thuật, biên soạn (convert) từ các ngôn ngữ khác để chia sẻ với độc giả.
					</p>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">2. Trách nhiệm nội dung</h6>
					<ul>
						<li class="mb-2"><strong>Kiểm soát thông tin:</strong> Mặc dù luôn cố gắng đảm bảo tính hợp pháp của nội dung trên hệ thống, chúng tôi không cam kết có thể kiểm soát hoàn toàn mọi thông tin do người dùng đăng tải trên ứng dụng và website.</li>
						<li class="mb-2"><strong>Trách nhiệm cá nhân:</strong> Thành viên đăng truyện phải chịu trách nhiệm cuối cùng về quyền sử dụng và tính nguyên bản của tác phẩm. Việc phát tán trái phép các tác phẩm văn học là hành vi vi phạm pháp luật.</li>
					</ul>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">3. Biện pháp xử lý vi phạm</h6>
					<p>Tiệm Truyện Chữ sẽ áp dụng các biện pháp công nghệ cần thiết để bảo vệ quyền tác giả, bao gồm nhưng không giới hạn ở:</p>
					<ul>
						<li>Gỡ bỏ ngay lập tức các nội dung có vấn đề về bản quyền khi có chứng cứ xác thực.</li>
						<li>Chặn địa chỉ IP hoặc khóa tài khoản vĩnh viễn đối với các cá nhân cố tình vi phạm nhiều lần.</li>
						<li>Hợp tác xử lý theo yêu cầu chính thức từ tác giả gốc hoặc cơ quan chức năng có thẩm quyền.</li>
					</ul>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">4. Giới hạn trách nhiệm pháp lý</h6>
					<ul>
						<li class="mb-2">Nền tảng không đại diện cho bất kỳ cá nhân hay nhóm dịch thuật nào tham gia hoạt động trên hệ thống.</li>
						<li class="mb-2">Tiệm Truyện Chữ không có trách nhiệm truy cứu, kiện tụng hay đứng ra phân giải đối với các tranh chấp bản quyền của những tác phẩm không thuộc sở hữu trực tiếp của nền tảng.</li>
					</ul>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">5. Thông tin liên hệ và khiếu nại</h6>
					<p>
						Chúng tôi luôn sẵn sàng lắng nghe và giải quyết các vấn đề liên quan đến bản quyền một cách minh bạch. 
						Nếu bạn phát hiện bất kỳ nội dung nào vi phạm quyền sở hữu trí tuệ của mình trên hệ thống, vui lòng liên hệ trực tiếp:
					</p>
					
					<div class="row g-3 mt-2">
						<div class="col-md-4">
							<a href="/cdn-cgi/l/email-protection#b9caccc9c9d6cbcdf9cdd0dcd4cdcbccc0dcd7dad1cc97dad6d4" class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2">
								<i class="fas fa-envelope"></i> Email
							</a>
						</div>
						<div class="col-md-4">
							<a href="https://www.tiktok.com/@tiemtruyenchu" target="_blank" class="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2">
								<i class="fab fa-tiktok"></i> Tiktok
							</a>
						</div>
						<div class="col-md-4">
							<a href="https://www.facebook.com/tiemtruyenchu" target="_blank" class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2">
								<i class="fab fa-facebook"></i> Fanpage
							</a>
						</div>
					</div>
					<p class="mt-3 text-muted small">Chúng tôi sẽ tiến hành xác minh và phản hồi yêu cầu của bạn trong thời gian sớm nhất.</p>

					<div class="text-center mt-5 pt-3 border-top">
						<p class="fst-italic fw-bold text-primary mb-1">Tiệm Truyện Chữ - Vì một cộng đồng đọc truyện văn minh và tôn trọng chất xám.</p>
					</div>
				</div>

				<div class="modal-footer border-0 justify-content-center pb-3 pt-0">
					<button type="button" class="btn btn-secondary px-5 rounded-pill" data-bs-dismiss="modal">Đóng</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="guideModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
			<div class="modal-content border-0 shadow-lg" style="border-radius: 15px; overflow: hidden;">
				
				<div class="modal-header text-white border-0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
					<h5 class="modal-title fw-bold">
						<i class="fas fa-book-reader me-2"></i> HƯỚNG DẪN SỬ DỤNG
					</h5>
					<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>

				<div class="modal-body p-4" style="text-align: justify; line-height: 1.6; color: #4A3B55;">
					
					<div class="mb-4 fst-italic text-center text-muted border-bottom pb-3">
						Dưới đây là hướng dẫn chi tiết cách sử dụng website <strong>Tiệm Truyện Chữ</strong> dành cho độc giả và thành viên để tối ưu hóa trải nghiệm đọc truyện và tương tác.
					</div>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">
						<i class="fas fa-user-circle me-2"></i>1. Quản lý tài khoản cá nhân
					</h6>
					<ul>
						<li class="mb-2"><strong>Đăng ký và Đăng nhập:</strong> Bạn có thể tạo tài khoản mới bằng cách cung cấp tên tài khoản, email và mật khẩu. Đăng nhập giúp bạn lưu truyện vào tủ sách và đồng bộ dữ liệu.</li>
						<li class="mb-2"><strong>Lịch sử đọc truyện:</strong> Website tích hợp mục "Truyện mới xem" giúp bạn nhanh chóng quay lại chương đang đọc dở mà không cần tìm kiếm lại.</li>
					</ul>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">
						<i class="fas fa-mobile-alt me-2"></i>2. Đưa ra màn hình chính
					</h6>
					<div class="alert alert-light border border-secondary-subtle">
						<p class="small mb-2">Giúp truy cập nhanh như ứng dụng mà không cần mở trình duyệt.</p>
						<div class="row g-3">
							<div class="col-md-6">
								<div class="p-3 bg-white rounded shadow-sm border h-100">
									<strong class="text-dark"><i class="fab fa-apple me-1"></i> iPhone/iPad (Safari)</strong>
									<ol class="small ps-3 mt-2 mb-0">
										<li>Truy cập <strong>tiemtruyenchu.com</strong> bằng Safari.</li>
										<li>Nhấp vào biểu tượng <strong>Chia sẻ</strong> <i class="fas fa-share-square"></i> ở thanh dưới.</li>
										<li>Chọn <strong>Thêm vào màn hình chính</strong> (Add to Home Screen).</li>
										<li>Nhấn <strong>Thêm</strong> để hoàn tất.</li>
									</ol>
								</div>
							</div>
							<div class="col-md-6">
								<div class="p-3 bg-white rounded shadow-sm border h-100">
									<strong class="text-success"><i class="fab fa-android me-1"></i> Android (Chrome)</strong>
									<ol class="small ps-3 mt-2 mb-0">
										<li>Truy cập web bằng Chrome.</li>
										<li>Nhấn vào biểu tượng <strong>Ba chấm</strong> <i class="fas fa-ellipsis-v"></i> góc trên phải.</li>
										<li>Chọn <strong>Thêm vào màn hình chính</strong>.</li>
										<li>Nhấn <strong>Thêm</strong> để hoàn tất.</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">
						<i class="fas fa-heart me-2"></i>3. Các tính năng tương tác
					</h6>
					<div class="row row-cols-1 row-cols-md-2 g-3">
						<div class="col">
							<div class="d-flex align-items-start">
								<i class="fas fa-gift text-danger mt-1 me-2"></i>
								<div><strong>Hoa (Quà tặng):</strong> Tặng quà ủng hộ tác giả/dịch giả. Giúp truyện thăng hạng "Top Quà Tặng".</div>
							</div>
						</div>
						<div class="col">
							<div class="d-flex align-items-start">
								<i class="fas fa-ticket-alt text-warning mt-1 me-2"></i>
								<div><strong>Phiếu đề cử:</strong> Bình chọn cho truyện yêu thích để tăng uy tín và thu hút độc giả mới.</div>
							</div>
						</div>
						<div class="col">
							<div class="d-flex align-items-start">
								<i class="fas fa-bookmark text-primary mt-1 me-2"></i>
								<div><strong>Theo dõi:</strong> Lưu truyện vào Tủ sách. Nhận thông báo ngay khi có chương mới.</div>
							</div>
						</div>
						<div class="col">
							<div class="d-flex align-items-start">
								<i class="fas fa-eye text-info mt-1 me-2"></i>
								<div><strong>Lượt xem:</strong> Tổng số lần độc giả đọc tác phẩm. Thể hiện độ hot của truyện.</div>
							</div>
						</div>
					</div>
					<div class="mt-2 text-danger small fst-italic">* Lưu ý: Bạn cần Đăng nhập để sử dụng các tính năng này.</div>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">
						<i class="fas fa-search me-2"></i>4. Tìm kiếm và Lọc truyện
					</h6>
					<p class="mb-2">Tiệm phân chia rõ ràng các mục để bạn lựa chọn theo gu đọc:</p>
					<div class="d-flex flex-wrap gap-2">
						<span class="badge bg-light text-dark border">🍓Truyện Dịch</span>
						<span class="badge bg-light text-dark border">🍋Truyện Convert</span>
						<span class="badge bg-light text-dark border">🥑Truyện Ngắn</span>
						<span class="badge bg-light text-dark border">🍏Truyện Nam</span>
					</div>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">
						<i class="fas fa-compass me-2"></i>5. Khám phá nội dung
					</h6>
					<ul>
						<li><strong>Bảng xếp hạng:</strong> Tìm truyện hot dựa trên Quà tặng, Lượt xem, Đề cử.</li>
						<li><strong>Đề cử Biên tập viên:</strong> Các bộ truyện hay được BQT tuyển chọn kỹ lưỡng.</li>
						<li><strong>Mới cập nhật:</strong> Theo dõi tiến độ ra chương mới từng giây.</li>
					</ul>

					<h6 class="fw-bold text-uppercase text-primary mt-4 mb-3">
						<i class="fas fa-glasses me-2"></i>6. Trải nghiệm đọc
					</h6>
					<ul>
						<li><strong>Giao diện:</strong> Tối ưu cho cả điện thoại và máy tính, tốc độ tải nhanh.</li>
						<li><strong>Đóng góp:</strong> Bạn có thể đăng truyện sáng tác, dịch hoặc convert ngay trên nền tảng.</li>
						<li><strong>Cộng đồng:</strong> Bình luận, đánh giá và xem số người đang online cùng lúc.</li>
					</ul>
					
					<div class="text-center mt-5 pt-3 border-top">
						<p class="fst-italic fw-bold text-primary mb-1">Tiệm Truyện Chữ - "Tựa vào con chữ, ngủ một giấc ngon".</p>
						<p class="small text-muted">Chúc bạn có những giây phút thư giãn tuyệt vời!</p>
					</div>
				</div>

				<div class="modal-footer border-0 justify-content-center pb-3 pt-0">
					<button type="button" class="btn btn-secondary px-5 rounded-pill" data-bs-dismiss="modal">Đóng</button>
				</div>
			</div>
		</div>
	</div>
</footer>

<button id="scrollToTopBtn" class="scroll-btn">
    <i class="fa-solid fa-chevron-up"></i>
</button>

<style>
    .hover-purple:hover {
        color: #6f42c1 !important;
        transition: 0.3s;
    }
	.scroll-btn {
        position: fixed;
        bottom: 30px;
        right: 20px;
        width: 40px;
        height: 40px;
        background-color: #b78a28;
        color: white;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 2000;
        
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .scroll-btn.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    .scroll-btn:hover {
        background-color: #9a7320;
        transform: scale(1.1);
        color: white;
    }
    @media (max-width: 768px) {
        .scroll-btn {
            width: 35px;
            height: 35px;
            bottom: 50px; 
            right: 15px;
        }
    }
</style>

<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script>
    (function() {
        let lastScrollTop = 0;
        const scrollBtn = document.getElementById("scrollToTopBtn");

        window.addEventListener("scroll", function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop < lastScrollTop && scrollTop > 400) {
                scrollBtn.classList.add("show");
            } else {
                // Nếu lăn xuống hoặc về sát đầu trang thì ẩn đi
                scrollBtn.classList.remove("show");
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
        }, { passive: true });
        scrollBtn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    })();
</script>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        function clearAllFilters() {
            window.location.href = window.location.pathname;
        }

        function applyFilter(key, value) {
            const url = new URL(window.location.href);

            if (key !== 'page') {
                url.searchParams.delete('page');
            }
            
            if (value === 'all' || value === '') {
                url.searchParams.delete(key);
            } else {
                url.searchParams.set(key, value);
            }

            const btn = event.target;
            const parent = btn.closest('.filter-group');
            if (parent) {
                parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            }
            if (btn.classList.contains('filter-btn')) {
                btn.classList.add('active');
            } else if (btn.closest('.filter-btn')) {
                 btn.closest('.filter-btn').classList.add('active');
            }

            window.history.pushState({}, '', url.toString());
            
            const sidebarEl = document.getElementById('filterSidebar');
            if (window.innerWidth < 992 && sidebarEl.classList.contains('show')) {
                 const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebarEl);
                 if (bsOffcanvas) bsOffcanvas.hide();
            }

            fetchStories(url);
        }

        async function fetchStories(url) {
            const container = document.getElementById('story-list-container');
            const titleElement = document.getElementById('filter-title-text');
            const paginationContainer = document.getElementById('pagination-container');
            
            container.innerHTML = `
                <div class="text-center py-5">
                    <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-3 text-muted">Đang tải danh sách truyện...</p>
                </div>`;
            
            if(paginationContainer) paginationContainer.innerHTML = '';

            try {
                const fetchUrl = new URL(url.toString());
                fetchUrl.searchParams.set('ajax', '1'); 
                
                const response = await fetch(fetchUrl.toString());

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Server trả về dữ liệu không phải JSON");
                }

                const data = await response.json();
                if (data.success) {
					renderStories(data);
					
					if(titleElement) titleElement.innerText = data.title;
					updateStoryCount(data.totalStories || data.stories.length); 
				}
            } catch (err) {
                console.error("Lỗi lấy dữ liệu:", err);
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Lỗi tải dữ liệu</h3>
                        <p>Đã có lỗi xảy ra. Vui lòng thử lại!</p>
                    </div>`;
            }
        }

        function renderStories(data) {
            const stories = data.stories;
            const container = document.getElementById('story-list-container');
            const paginationContainer = document.getElementById('pagination-container');

            if (!stories || stories.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-book-open"></i>
                        <h3>Không tìm thấy truyện</h3>
                        <p>Không có truyện nào phù hợp với bộ lọc hiện tại.</p>
                        <button onclick="clearAllFilters()" class="btn btn-read mt-3">
                            <span class="me-1">↻</span>Xóa bộ lọc
                        </button>
                    </div>`;
                if(paginationContainer) paginationContainer.innerHTML = '';
                return;
            }

            let html = '';
            stories.forEach(story => {
                const badge = story.type === 'truyen-dich' ? 
                    '<span class="badge bg-success story-type-badge">Dịch</span>' :
                    story.type === 'sang-tac' ? 
                    '<span class="badge bg-danger story-type-badge">Sáng tác</span>' : 
                    '<span class="badge bg-secondary story-type-badge">Convert</span>';

                html += `
                    <div class="story-item" style="padding: 12px 15px; display: flex; align-items: center;">
                        <a href="/truyen/${story.id}" class="story-poster-container" style="flex-shrink: 0;">
                             <img src="${story.poster}" class="story-poster" alt="${story.title}" style="height: 120px; width: 85px; object-fit: cover;">
                        </a>
                        <div class="story-content" style="padding-left: 5px; flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <div class="story-header">
                                    <div>
                                        <a href="/truyen/${story.id}" class="story-title mb-1 d-inline-block" style="font-size: 15px; margin-bottom: 4px !important; line-height: 1.3; font-weight: 600;">
                                            ${badge} ${story.title}
                                        </a>
                                    </div>
                                </div>
                                <div class="story-meta" style="font-size: 12px; margin-bottom: 5px; color: #666;">
                                    <span style="margin-right: 10px; display: inline-block;">
                                        <i class="fas fa-user-edit"></i> ${story.author}
                                    </span>
                                    <span style="margin-right: 10px; display: inline-block;">
                                        <i class="fas fa-tag"></i> ${story.category}
                                    </span>
                                    <span style="margin-right: 10px; display: inline-block;">
										<i class="fa-solid fa-list-ol"></i>
										${story.total_chapters || 0} chương
									</span>
                                    <span class="${story.status === 'full' ? 'text-danger' : 'text-success'}" style="display: inline-block;">
                                        <i class="fas fa-${story.status === 'full' ? 'check-circle' : 'spinner'}" style="font-size: 11px;"></i>
                                        ${story.status === 'full' ? 'Hoàn thành' : 'Đang ra'}
                                    </span>
                                </div>
                                <div class="story-desc mb-2" style="font-size: 13px; line-height: 1.4; max-height: 38px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px !important; color: #555;">
                                    ${story.description || 'Truyện chưa có mô tả...'}
                                </div>
                            </div>
                            <div class="story-footer">
                                <div class="story-updated" style="font-size: 11px; color: #888;">
                                    <i class="far fa-clock me-1"></i> Cập nhật: ${story.formattedDate}
                                </div>
                                <div class="story-actions">
                                    <a href="/doc-truyen/${story.id}/chuong/1" class="btn btn-read">
                                         <i class="fas fa-book-open me-1"></i>Đọc truyện
                                    </a>
                                    <a href="/truyen/${story.id}" class="btn btn-detail">
                                        <i class="fas fa-info-circle me-1"></i>Chi tiết
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>`;
            });
            container.innerHTML = html;

            if (paginationContainer && data.totalPages > 1) {
                let paginationHtml = '<nav aria-label="Page navigation"><ul class="pagination">';
                const current = parseInt(data.currentPage);
                const total = parseInt(data.totalPages);

                paginationHtml += `
                    <li class="page-item ${current === 1 ? 'disabled' : ''}">
                        <button class="page-link" onclick="applyFilter('page', ${current - 1})" ${current === 1 ? 'disabled' : ''}>
                            <i class="fas fa-chevron-left"></i>
                        </button>
                    </li>`;

                for (let i = 1; i <= total; i++) {
                    if (i === 1 || i === total || (i >= current - 2 && i <= current + 2)) {
                        paginationHtml += `
                            <li class="page-item ${current === i ? 'active' : ''}">
                                <button class="page-link" onclick="applyFilter('page', ${i})">${i}</button>
                            </li>`;
                    } else if (i === current - 3 || i === current + 3) {
                        paginationHtml += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
                    }
                }

                paginationHtml += `
                    <li class="page-item ${current === total ? 'disabled' : ''}">
                        <button class="page-link" onclick="applyFilter('page', ${current + 1})" ${current === total ? 'disabled' : ''}>
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </li>`;

                paginationHtml += '</ul></nav>';
                paginationContainer.innerHTML = paginationHtml;
            } else if (paginationContainer) {
                paginationContainer.innerHTML = '';
            }
        }

        function updateStoryCount(count) {
            const countElement = document.querySelector('.story-count');
            if (countElement) {
                countElement.innerHTML = `<i class="fas fa-bookmark me-1"></i>${count} truyện`;
            }
        }

        window.addEventListener('popstate', function() {
            fetchStories(new URL(window.location.href));
        });
    </script>
<script defer src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015" integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==" data-cf-beacon='{"version":"2024.11.0","token":"e93a99f6da974455bdcce46a5fa28069","r":1,"server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
</body>
</html>