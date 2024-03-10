import { Link, Outlet } from 'umi';
import styles from './index.scss';
import Tab from '../components/tab/Tab';
import Header from '@/components/header/Header';
export default function Layout() {
  return (
    <>
      <Header />
      <Tab />
      <Outlet></Outlet>
    </>
  );
}
