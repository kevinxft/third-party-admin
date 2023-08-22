<template>
  <div>
    <a-button @click="onShowModal">录入</a-button>
    <BasicModal
      v-bind="$attrs"
      width="800px"
      @register="register"
      :maskClosable="false"
      okText="开始录入"
      @visible-change="onVisibleChange"
      @ok="onUpload"
    >
      <div> 词典名称: {{ info.name }} </div>
      <div class="mb4"> 词典ID: {{ info.dictId }}</div>
      选择需要录入的词典文件，只支持json
      <input type="file" @change="onSelectedFile" accept=".json" />
      <div class="mt4" v-if="percent !== 0">上传进度： {{ percent }}</div>
    </BasicModal>
  </div>
</template>

<script setup lang="ts">
  import { ref, onUnmounted } from 'vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { uploadDict } from '/@/api/resource';
  import { useGlobSetting } from '/@/hooks/setting';
  import { io, Socket } from 'socket.io-client';

  const settings = useGlobSetting();
  let socket: Socket | null = null;

  onUnmounted(() => {
    socket && socket.close();
  });

  const info = ref({ name: '', dictId: '' });
  const file = ref('');
  const percent = ref<string | number>(0);

  const props = defineProps({
    data: Object,
  });

  async function onShowModal() {
    info.value = { name: props.data?.record.name, dictId: props.data?.record.dictId };
    file.value = '';
    percent.value = 0;
    await openModal();
    if (!socket) {
      socket = io(settings.urlPrefix as string);
    }
    socket.on('writing', (data) => {
      console.log(data);
      if (data.done) {
        percent.value = '完成';
        return;
      }
      percent.value = data.progress;
    });
  }

  async function onSelectedFile(e) {
    console.log(e.target.files);
    file.value = e.target.files[0];
  }

  async function onUpload() {
    const formData = new FormData();
    formData.append('name', info.value.name);
    formData.append('dictId', info.value.dictId);
    formData.append('file', file.value);
    await uploadDict(formData);
  }

  function onVisibleChange(visible) {
    if (!visible) {
      props.data?.methods.reload();
    }
  }

  const [register, { openModal }] = useModal();
</script>
