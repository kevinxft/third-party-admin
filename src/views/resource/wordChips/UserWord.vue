<template>
  <ResourceLayout database="wordChips" name="userWord" :columns="columns" />
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ResourceLayout from './../ResourceLayout.vue';

  const columns = reactive([
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
    },
    {
      title: 'BookId',
      dataIndex: 'bookId',
    },
  ]);
</script>
