<template>
  <footer class="w-full py-1 px-6 border-t border-white/5 bg-transparent">
    <div
      class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div
        class="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity"
      >
        <img
          src="@/assets/VBStats.png"
          alt="logo"
          class="w-8 h-auto grayscale"
        />
        <span class="text-sm font-light tracking-widest uppercase"
          >VB Stats</span
        >
      </div>

      <div class="text-slate-500 text-[10px] uppercase tracking-[0.2em]">
        &copy; {{ new Date().getFullYear() }} — Tous droits réservés
      </div>

      <div class="hidden sm:block w-32"></div>
    </div>
  </footer>
</template>
