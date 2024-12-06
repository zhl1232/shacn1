<template>
  <div class="min-h-screen pt-16 pb-12 flex flex-col bg-white">
    <main class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex-shrink-0 flex justify-center">
        <span class="i-heroicons-exclamation-triangle text-6xl text-indigo-600"></span>
      </div>
      <div class="py-16">
        <div class="text-center">
          <p class="text-sm font-semibold text-indigo-600 uppercase tracking-wide">404 错误</p>
          <h1 class="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            页面未找到
          </h1>
          <p class="mt-2 text-base text-gray-500">抱歉，我们找不到您要访问的页面。</p>
          <div class="mt-6">
            <router-link
              to="/"
              class="text-base font-medium text-indigo-600 hover:text-indigo-500"
            >
              返回首页<span aria-hidden="true"> &rarr;</span>
            </router-link>
          </div>
        </div>
      </div>
    </main>
    <footer class="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex justify-center space-x-4">
        <router-link
          to="/"
          class="text-sm font-medium text-gray-500 hover:text-gray-600"
        >
          首页
        </router-link>
        <span class="inline-block border-l border-gray-300" aria-hidden="true" />
        <a
          href="#"
          class="text-sm font-medium text-gray-500 hover:text-gray-600"
        >
          联系我们
        </a>
        <span class="inline-block border-l border-gray-300" aria-hidden="true" />
        <a
          href="#"
          class="text-sm font-medium text-gray-500 hover:text-gray-600"
        >
          技术支持
        </a>
      </nav>
    </footer>
  </div>
</template> 