<template>
  <div class="user-card">
    <div class="user-card__image-wrapper">
      <img
          :src="user.picture.large"
          :alt="fullName"
          class="image"
          loading="lazy"
      />
    </div>

    <div class="user-card__content">
      <h3 class="name" :dir="textDirection">{{ fullName }}</h3>
      <div class="email" @click="copyToClipboard(user.email)">
        {{ user.email }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed} from 'vue';
import type {UserCardProps} from './types';
import {copyToClipboard} from "@/utils/helpers.ts";

const props = defineProps<UserCardProps>();

const fullName = computed(() =>
    `${props.user.name.first} ${props.user.name.last}`
);

const textDirection = computed(() => {
  // Проверяем наличие арабских символов в имени
  const hasArabic = /[\u0600-\u06FF]/.test(fullName.value);
  return hasArabic ? 'rtl' : 'ltr';
});
</script>
<style lang="scss" scoped>
.user-card {
  background: url("@/assets/images/card-bg.png") no-repeat center center;
  width: 260px;
  border-radius: 36px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;

  &:hover {
    box-shadow: 0 0 20px rgb(59, 59, 59);
  }

  &__image-wrapper {
    width: 100px;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 50%;
    margin-bottom: 12px;

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

  }

  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    flex: 1;

    .name {
      font-size: 1.25rem;
      font-weight: 600;
      color: $text-main;

      &[dir="rtl"] {
        text-align: right;
      }
    }

    .email {
      width: 200px;
      background: $bg-main;
      color: $text-main;
      max-width: 100%;
      padding: 1rem;
      border-radius: 1.5rem;
      font-size: 0.8rem;
      cursor: pointer;

      // Если текст выходит за пределы блока, обрезаем его и добавляем многоточие
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

    }
  }
}
</style>