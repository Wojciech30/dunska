<template>
  <div class="public-layout">
    <AppNavbar />
    <main>
      <router-view />
    </main>
    <AppFooter />
    <InquiryModal :visible="inquiryOpen" @close="inquiryOpen = false" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import InquiryModal from "@/components/InquiryModal.vue";

const inquiryOpen = ref(false);

const onOpenInquiry = () => {
  inquiryOpen.value = true;
};

onMounted(() => window.addEventListener("open-inquiry", onOpenInquiry));
onUnmounted(() => window.removeEventListener("open-inquiry", onOpenInquiry));
</script>

<style scoped>
.public-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
</style>
