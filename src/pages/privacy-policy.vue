<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-white dark:bg-slate-900 pt-32 pb-16 px-4 border-b border-slate-100 dark:border-slate-800">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="font-serif text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
          Privacy Policy
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400">
          Last updated: December 2025
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div class="prose prose-lg dark:prose-invert prose-slate mx-auto">
        <p class="lead text-xl leading-relaxed text-slate-600 dark:text-slate-300">
          At Stage & Bloom, accessible from stageandbloom.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Stage & Bloom and how we use it.
        </p>

        <div class="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 my-8">
          <h3 class="font-bold text-slate-900 dark:text-white mb-2 !mt-0">Consent</h3>
          <p class="!mb-0 text-sm">By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
        </div>

        <h2>Information We Collect</h2>
        <p>
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
        </p>
        <p>
          If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
        </p>

        <h2>How we use your information</h2>
        <p>We use the information we collect in various ways, including to:</p>
        <ul>
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </ul>

        <h2>Log Files</h2>
        <p>
          Stage & Bloom follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
        </p>

        <h2>Cookies and Web Beacons</h2>
        <p>
          Like any other website, Stage & Bloom uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports'

useSeoMeta({
  title: 'Privacy Policy - Stage & Bloom',
  description: 'Privacy Policy for Stage & Bloom.',
})
</script>

<style scoped>
/* Scoped styles if needed, prose classes handled via Tailwind typography plugin */
</style>
