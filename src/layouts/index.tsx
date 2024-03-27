import {  Outlet } from 'umi';
import Tab from '../components/tab/Tab';
import Header from '@/components/header/Header';
import Player from '@/components/player/Player';
export default function Layout() {
  return (
    <>
      <Header />
      <Tab />
      <Outlet></Outlet>
      <Player />
    </>
  );
}
