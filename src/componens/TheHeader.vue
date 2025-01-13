<template>
  <header class="header">
    <div class="header__logo">
      <img src="@/assets/images/header.webp" alt="Logo Findly" />
    </div>
  </header>
</template>

<script lang="ts">
/**
 * @fileoverview TheHeader component represents the header section of the application.
 * It displays the logo of the application and is responsive across different screen sizes.
 * @module components/TheHeader
 */

export default {
  name: 'TheHeader',
};
</script>

<style scoped lang="scss">
/**
 * Header container styles.
 * Ensures the header spans the full width and handles overflow.
 */
.header {
  width: 100%;
  overflow: hidden;

  /**
   * Logo container styles.
   * Centers the logo horizontally and vertically.
   */
  &__logo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    /**
     * Logo image styles.
     * Ensures the image is responsive and scales appropriately.
     */
    img {
      width: 100%;
      height: auto;
      max-width: none;
      display: block;
    }
  }
}

/**
 * Responsive styles for screens with a maximum width of 900px.
 * Adjusts the logo width to maintain visibility.
 */
@media (max-width: 900px) {
  .header__logo img {
    width: 146%;
  }
}

/**
 * Responsive styles for screens with a maximum width of 700px.
 * Further adjusts the logo width for smaller screens.
 */
@media (max-width: 700px) {
  .header__logo img {
    width: 300%;
  }
}
</style>