<template>
  <ResourceLayout database="allInOne" table="weixinUser" :columns="columns" />
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
  ]);
</script>
