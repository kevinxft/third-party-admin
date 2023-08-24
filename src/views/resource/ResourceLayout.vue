<template>
  <div class="p-4">
    <BasicTable
      :canResize="true"
      :columns="columns"
      :pagination="{
        total: total,
        pageSize: 20,
        defaultPageSize: 20,
        pageSizeOptions: ['10', '20', '30', '50'],
      }"
      showTableSetting
      @columns-change="handleColumnChange"
      @register="registerTable"
      :api="getTableData"
    >
      <template #bodyCell="cellData">
        <slot name="cell" v-bind="{ ...cellData, methods: { reload: _reload } }"> </slot>
      </template>
    </BasicTable>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getList } from '../../api/resource';

  const [registerTable, { reload }] = useTable();
  const total = ref(0);

  const _reload = () => {
    console.log('reload');
    reload();
  };

  defineExpose({ reload: _reload });

  const props = defineProps({
    database: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    columns: {
      type: Array<any>,
      required: true,
    },
  });

  const getTableData = async (params) => {
    const res = await getList(props.database, props.name, params);
    return res;
  };

  function handleColumnChange(data) {
    console.log('ColumnChanged', data);
  }
</script>
