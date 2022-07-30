<template>
  <div class="min-h-screen app-page">
    <Preload>
      <Auth>
        <slot />
      </Auth>
    </Preload>
  </div>
</template>
