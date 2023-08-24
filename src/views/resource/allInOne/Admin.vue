<template>
  <ResourceLayout database="allInOne" name="admin" :columns="columns" />
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ResourceLayout from './../ResourceLayout.vue';

  const columns = reactive([
    {
      title: '用户名',
      dataIndex: 'username',
    },
  ]);
</script>
