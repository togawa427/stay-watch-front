import { Tabs } from '@mantine/core';
import { useState } from 'react';
import UserEdit from '@/features/admin/components/UserEdit';
import UserInvite from '@/features/admin/components/UserInvite';
import EditFloorMap from '@/features/admin/editFloorMap/components/EditFloorMap';
import UserEditor from '@/features/admin/editUser/components/EditUser';
import { useUserRoleState } from '@/globalStates/userRoleState';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<string | null>('first');
  const userRole = useUserRoleState();

  if (userRole === 1) {
    return <div>管理者権限がありません</div>;
  }

  return (
    <Tabs
      value={activeTab}
      onTabChange={setActiveTab}
      orientation={'vertical'}
      variant={'outline'}
      color={'blue'}
      classNames={{
        tab: 'h-24',
        root: 'mt-2',
      }}
    >
      <Tabs.List>
        <Tabs.Tab value='first' className='border-4 text-lg'>
          メンバー確認・削除
        </Tabs.Tab>
        <Tabs.Tab value='second' className='border-4 text-lg'>
          メンバーの招待
        </Tabs.Tab>
        <Tabs.Tab value='third' className='border-4 text-lg'>
          マップの編集
        </Tabs.Tab>
        <Tabs.Tab value='fourth' className='border-4 text-lg'>
          New ユーザ編集
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='first' className='border-l-4'>
        <UserEdit />
      </Tabs.Panel>
      <Tabs.Panel value='second' className='border-l-4'>
        <UserInvite />
      </Tabs.Panel>
      <Tabs.Panel value='third' className='border-l-4'>
        <EditFloorMap />
      </Tabs.Panel>
      <Tabs.Panel value='fourth' className='border-l-4'>
        <UserEditor />
      </Tabs.Panel>
    </Tabs>
  );
};