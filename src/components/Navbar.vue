<template>
    <nav>
      <span class="nav-brand">SuperAuto.pl</span>
      <router-link to="/">Pagrindinis</router-link>
      <router-link to="/profile">Profilis</router-link>
      <!-- Add other links as needed -->
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    // Any additional script logic for your navbar
  };
  </script>
  
  <style>
  nav {
    background-color: #333; /* Dark background */
    color: white; /* Light text */
    display: flex; /* Aligns items in a row */
    justify-content: space-between; /* Spaces items evenly */
    padding: 0.5rem 1rem; /* Padding around the navbar */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Adds a subtle shadow */
  }
  
  nav router-link {
    color: white; /* Ensures links are also light-colored */
    text-decoration: none; /* Removes underline from links */
    margin-right: 1rem; /* Spacing between links */
  }
  
  nav router-link:hover {
    color: #ddd; /* Lighter color on hover for visual feedback */
  }
  
  /* If you have a brand or title in your navbar */
  .nav-brand {
    font-weight: bold; /* Makes the brand/title more prominent */
    font-size: 1.2rem; /* Slightly larger size for the brand/title */
  }
  </style>
  
  