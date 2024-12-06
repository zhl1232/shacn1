<script setup lang="ts">
// 认证布局不需要特别的逻辑
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div class="text-center">
        <img class="mx-auto h-12 w-auto" src="../assets/logo.svg" alt="Logo" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          <router-view name="title">
            欢迎使用
          </router-view>
        </h2>
      </div>

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 