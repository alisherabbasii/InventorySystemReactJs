import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../images/logo.png';
import CustomersIcon from '../../images/sidebar/customers.png';
import SalesIcon from '../../images/sidebar/sales.png';
import StockIcon from '../../images/sidebar/stock.png';
import GAccIcon from '../../images/sidebar/generalacc.png';
import ExitIcon from '../../images/sidebar/exit.png';
import PaymentIcon from '../../images/sidebar/payment.png';



import { useSelector } from 'react-redux';
import SidebarLinkGroup from './SidebarLinkGroup';
import {
  GraduationCap,
  Home,
  MessageCircle,
  MessageCircleMore,
  SquareLibrary,
  Users,
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

interface NavItem {
  path?: string;
  name: string;
  icon: React.ReactElement;
  subItems?: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const userType = useSelector((state: any) => state.auth.userType);
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, setSidebarOpen]);


  const sidebarItems: NavItem[] = [
    {
      path: '/customerAndSuppliers',
      name: 'Customer and Suppliers',
      icon: <img src={CustomersIcon} height={20} width={20} />,
    },
    {
      path: '/salesAndPurchases',
      name: 'Sales and Purchases',
      icon: <img src={SalesIcon} height={20} width={20} />
    },
    {
      path: '/paymentAndReceipt',
      name: 'Payment and Receipts',
      icon: <img src={PaymentIcon} height={20} width={20} />

    },
    {
      path: '/stockcontrols',
      name: 'Stock Controls',
      icon: <img src={StockIcon} height={20} width={20} />

    },
    {
      path: '/generalAccount',
      name: 'General Accounts',
      icon: <img src={GAccIcon} height={20} width={20} />
    },
    {
      path: '/exit',
      name: 'Exit',
      icon: <img src={ExitIcon} height={20} width={20} />

    }
  ];

  const adminItems: NavItem[] = [
    {
      path: '/addUser',
      name: 'Add User',
      icon: <Users size={20} />,
    },
    {
      path: '/exit',
      name: 'Exit',
      icon: <img src={ExitIcon} height={20} width={20} />

    }
  ];
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const getNavItems = (): NavItem[] => {
    if(userType=='admin'){
      return adminItems
    }else{
      return sidebarItems
    }

  };

  const getLinkClass = (isActive: boolean): string => {
    return `group  relative flex justify-between items-center gap-2.5 rounded-md py-3 px-4 font-medium duration-300 ease-in-out text-left ${
      isActive
        ? 'text-black bg-cyan-200 dark:bg-zinc-700 text-sm dark:text-white'
        : 'text-black dark:text-white dark:hover:bg-slate-900 text-sm hover:bg-blue-400 hover:text-white'
    }`;
  };

  return (
    <aside
      className={`absolute left-0 top-0 z-9999 border-r-8 border-slate-200 border-double flex h-screen ${
        sidebarOpen ? ' md:w-72 lg:w-72 w-48' : 'md:w-24 lg:w-24 w-0'
      } flex-col overflow-y-hidden duration-300 ease-linear dark:bg-boxdark bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-850`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="px-6 pt-5.5 lg:pt-6.5" style={{alignSelf: 'center'}}>
        <NavLink to="/">
          {sidebarOpen &&
          <img src={Logo} alt="Logo" className='items-center' />
          }
        </NavLink>

        {/* <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button> */}
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className=" px-2 lg:mt-14 lg:px-4">
          <div>
            <div className="no-scrollbar  flex flex-col overflow-y-auto duration-300 ease-linear">
              <nav className="">
                <div>
                  {getNavItems().map((item) =>
                    item.subItems ? (
                      <SidebarLinkGroup
                        key={item.name}
                        activeCondition={pathname.includes(
                          item.subItems[0].path!,
                        )}
                      >
                        {(handleClick, open) => (
                          <>
                            <button
                              onClick={handleClick}
                              className={getLinkClass(
                                pathname.includes(item.subItems![0].path!),
                              )}
                              title={item.name}
                            >
                              {item.icon}
                              {sidebarOpen && (
                                <span className="ml-2">{item.name}</span>
                              )}
                            </button>
                            {open && (
                              <ul className="list-none mt-2 mb-5.5  flex flex-col gap-2.5 pl-5">
                                {item.subItems!.map((subItem) => (
                                  <li
                                    key={subItem.path}
                                    className="list-none "
                                    title={item.name}
                                  >
                                    <NavLink
                                      to={subItem.path!}
                                      className={({ isActive }) =>
                                        getLinkClass(isActive)
                                      }
                                      title={item.name}
                                    >
                                      {subItem.icon}
                                      {sidebarOpen && (
                                        <span className="ml-2">
                                          {subItem.name}
                                        </span>
                                      )}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        )}
                      </SidebarLinkGroup>
                    ) : (
                      <NavLink
                        key={item.path}
                        to={item.path!}
                        className={({ isActive }) => getLinkClass(isActive)}
                        title={item.name}
                      >
                      
                        {sidebarOpen && (
                          <span className="ml-2">{item.name}</span>
                        )}
                         <span className='float-right'> {item.icon} </span>
                      </NavLink>
                    ),
                  )}
                </div>
              </nav>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
