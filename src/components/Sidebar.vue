<template>
  <div class="container-fluid">
      <!-- sidebar -->
      <nav class="pt-3 col-md-2 d-none d-md-block sidebar">
        <div class="sidebar-sticky">
          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span class="text-endless">管理員</span>
            <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
              <span data-feather="plus-circle"></span>
            </a>
          </h6>
          <ul class="nav flex-column mb-2 ul">
            <li class="nav-item">
              <router-link to="/admin" class="nav-link">
                <i class="fas fa-list-ul mr-1"></i>
                首頁
              </router-link>
              <router-link to="/admin/productsList" class="nav-link">
                <i class="fas fa-list-ul mr-1"></i>
                產品列表
              </router-link>
              <router-link to="/admin/memberInfo" class="nav-link">
                <i class="far fa-folder-open mr-1"></i>
                管理員列表
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style lang="scss" scoped>
.container {
  width: 200px;
}
.sidebar-style {
  height: 800px;
  background-color: rgba(0, 0, 0, 0);
}
h6, .ul, .btn {
  width: 150px;
}
a {
  text-decoration: none;
  background-color: transparent;
  color: #F3E1AA;
}

.router-link-exact-active {
  color: #F2CA52;
  font-weight: bold;
}

.sidebar {
  border-right: 2px double #F3F6E0;
  margin-top: 75px;
}

.sidebar-sticky {
  position: sticky;
  left: 0px;
  top: 100px;
}
</style>