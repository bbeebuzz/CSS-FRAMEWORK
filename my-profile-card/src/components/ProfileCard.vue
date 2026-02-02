<script setup>
defineProps([
  "profileimg",
  "background",
  "name",
  "subheading",
  "followers",
  "following",
  "projects",
  "facebook",
  "instagram",
  "tiktok",
]);
</script>

<template>
  <!-- Card -->
  <div
    class="bg-white shadow-lg rounded-2xl min-[320px] overflow-hidden text-center transition-all duration-300 transform hover:-translate-y-10 hover:shadow-2xl"
  >
    <!-- Image Header / Profile Picture -->
    <div
      class="relative min-h-32 bg-cove bg-center"
      :style="'background-image: url(' + background + ')'"
    >
      <img
        :src="profileimg"
        alt="Profile Image"
        class="inline-block w-32 h-32 rounded-full object-center object-cover border-6 border-white absolute top-full left-1/2 transform -translate-1/2"
      />
    </div>

    <!-- SubHeading -->
    <div class="px-6 pt-20 pb-6">
      <h2 class="font-bold text-gray-800 text-2xl mb-2">{{ name }}</h2>
      <h3 class="text-gray-600 text-lg">{{ subheading }}</h3>

      <div class="flex justify-center gap-4 mb-2">
        <a :href="facebook" target="_blank" class="text-blue-600 hover:scale-110 transition-transform">Facebook</a>
        <a :href="instagram" target="_blank" class="text-pink-600 hover:scale-110 transition-transform">Instagram</a>
        <a :href="tiktok" target="_blank" class="text-blue-800 hover:scale-110 transition-transform">Tiktok</a>
      </div>
    </div>

    <!-- Stats -->
    <div
      class="p-6 border-t border-gray-200 flex items-center justify-center gap-6"
    >
      <!-- Followers -->
      <div>
        <h4 class="text-gray-600 text-sm">Followers</h4>
        <p class="font-bold text-gray-800 text-2xl">{{ followers }}</p>
      </div>

      <!-- Following -->
      <div>
        <h4 class="text-gray-600 text-sm">Following</h4>
        <p class="font-bold text-gray-800 text-2xl">{{ following }}</p>
      </div>

      <!-- Projects -->
      <div>
        <h4 class="text-gray-600 text-sm">Projects</h4>
        <p class="font-bold text-gray-800 text-2xl">{{ projects }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
