<template>
  <div class="p-4">
    <BasicTable
      :dataSource="data"
      :canResize="true"
      :loading="loading"
      :columns="columns"
      :pagination="pagination"
      showTableSetting
      @columns-change="handleColumnChange"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { getList } from '../../api/resource';

  const loading = ref(false);
  const data = ref([]);
  const pagination = ref<any>({
    pageSize: 20,
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 30, 50],
  });
  const query = reactive({
    page: 1,
    limit: 20,
  });

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    columns: {
      type: Array<any>,
      required: true,
    },
  });
  onMounted(async () => {
    getTableData();
  });

  const getTableData = async () => {
    const res = await getList(props.name, query);
    data.value = res.data;
    pagination.value = {
      ...pagination.value,
      total: res.total,
    };
  };

  function handleColumnChange(data) {
    console.log('ColumnChanged', data);
  }

  function handleChange(data) {
    query.limit = data.pageSize;
    query.page = data.current;
    getTableData();
  }
</script>
../../api/resource
