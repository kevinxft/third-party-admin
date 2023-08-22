<template>
  <ResourceLayout database="wordChips" name="userBook" :columns="columns" />
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
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
    },
    {
      title: '每次学习',
      dataIndex: 'learnLimit',
    },
    {
      title: '单词学习次数',
      dataIndex: 'learnedLevel',
    },
  ]);
</script>
