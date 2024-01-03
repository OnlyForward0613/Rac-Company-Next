import dynamic from "next/dynamic";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { type ACTION_CONST, type TAB_IDS } from "~/constants";
import { useNavContext, type NavTitleType } from "./NavigationContext";

const AutoImportDraftsPanel = dynamic(
  () => import("~/components/AutoImport/Drafts/DraftsPanel"),
);
const AutoImportOrdersPanel = dynamic(
  () => import("~/components/AutoImport/Orders/OrdersPanel"),
);
const AutoImportRequestsPanel = dynamic(
  () => import("~/components/AutoImport/Requests/RequestsPanel"),
);
const ExportDraftsPanel = dynamic(
  () => import("~/components/Export/Drafts/DraftsPanel"),
);
const ExportOrdersPanel = dynamic(
  () => import("~/components/Export/Orders/OrdersPanel"),
);
const ExportRequestsPanel = dynamic(
  () => import("~/components/Export/Requests/RequestsPanel"),
);
const ImportDraftsPanel = dynamic(
  () => import("~/components/Import/Drafts/DraftsPanel"),
);
const ImportOrdersPanel = dynamic(
  () => import("~/components/Import/Orders/OrdersPanel"),
);
const ImportRequestsPanel = dynamic(
  () => import("~/components/Import/Requests/RequestsPanel"),
);
const ShopDraftsPanel = dynamic(
  () => import("~/components/Shop/Drafts/DraftsPanel"),
);
const ShopOrdersPanel = dynamic(
  () => import("~/components/Shop/Orders/OrdersPanel"),
);
const ShopRequestsPanel = dynamic(
  () => import("~/components/Shop/Requests/RequestsPanel"),
);

export type TabContextType = {
  activeAction: ActionType | null;
  activeTab: AppBarTabType["tabs"][number]["id"] | null;
  customText: string | null;
  tabs: AppBarTabType[];
  tabsRef: MutableRefObject<Array<HTMLButtonElement | null>>;
  viewIndex: number | null;
  handleActiveAction: (action: ActionType | null) => void;
  handleCustomText: (text: string | null) => void;
  handleTabChange: (tab: TabIdType) => void;
  handleViewIndex: (index: number | null) => void;
};

export const TabContext = createContext<TabContextType>({} as TabContextType);

export const useTabContext = () => useContext(TabContext);

type ActionType = (typeof ACTION_CONST)[number];

type TabIdType = (typeof TAB_IDS)[number];

type TabType = {
  id: TabIdType;
  title: string;
  content: JSX.Element;
};

type AppBarTabType = { nav: NavTitleType; tabs: TabType[] };

export const tabs: [AppBarTabType, ...AppBarTabType[]] = [
  {
    nav: "Shop For Me",
    tabs: [
      { id: "orders", title: "Orders", content: <ShopOrdersPanel /> },
      { id: "requests", title: "Requests", content: <ShopRequestsPanel /> },
      { id: "drafts", title: "Drafts", content: <ShopDraftsPanel /> },
    ],
  },
  {
    nav: "Export",
    tabs: [
      { id: "orders", title: "Orders", content: <ExportOrdersPanel /> },
      { id: "requests", title: "Requests", content: <ExportRequestsPanel /> },
      { id: "drafts", title: "Drafts", content: <ExportDraftsPanel /> },
    ],
  },
  {
    nav: "Import",
    tabs: [
      { id: "orders", title: "Orders", content: <ImportOrdersPanel /> },
      { id: "requests", title: "Requests", content: <ImportRequestsPanel /> },
      { id: "drafts", title: "Drafts", content: <ImportDraftsPanel /> },
    ],
  },
  {
    nav: "Auto Import",
    tabs: [
      { id: "orders", title: "Orders", content: <AutoImportOrdersPanel /> },
      {
        id: "requests",
        title: "Requests",
        content: <AutoImportRequestsPanel />,
      },
      { id: "drafts", title: "Drafts", content: <AutoImportDraftsPanel /> },
    ],
  },
];

const getFirstTab = (activeNav: NavTitleType) => {
  const activeTabs = tabs.find((tab) => tab.nav === activeNav);

  if (activeTabs && activeTabs.tabs.length > 0 && activeTabs.tabs[0]) {
    return activeTabs.tabs[0].id;
  }

  return null;
};

const TabContextProvider = ({ children }: { children: ReactNode }) => {
  const { activeNav } = useNavContext();

  const [activeAction, setActiveAction] = useState<ActionType | null>(null);

  const [activeTab, setActiveTab] = useState<
    AppBarTabType["tabs"][number]["id"] | null
  >(getFirstTab(activeNav));

  const [customText, setCustomText] = useState<string | null>(null);

  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const [viewIndex, setViewIndex] = useState<number | null>(null);

  const handleActiveAction = (action: ActionType | null) => {
    setActiveAction(action);
  };

  const handleCustomText = (text: string | null) => {
    setCustomText(text);
  };

  const handleTabChange = (tabId: TabIdType | null) => {
    let clickedTabIndex = null;
    tabs.forEach(({ nav, tabs }) => {
      if (nav === activeNav)
        tabs.forEach((tab, i) => {
          if (tab.id === tabId) {
            clickedTabIndex = i;
          }
        });
    });

    if (clickedTabIndex) {
      if (!tabsRef.current[clickedTabIndex]) return;
      tabsRef.current[clickedTabIndex]?.click();
    }
    setActiveTab(tabId);
    reset();
  };

  const handleViewIndex = (index: number | null) => {
    setViewIndex(index);
  };

  const reset = () => {
    setActiveAction(null);
    setViewIndex(null);
    if (activeNav !== "Notifications") setCustomText(null);
  };

  useEffect(() => {
    handleTabChange(getFirstTab(activeNav));
  }, [activeNav]);

  const value: TabContextType = {
    activeAction,
    activeTab,
    customText,
    tabs,
    tabsRef,
    viewIndex,
    handleActiveAction,
    handleCustomText,
    handleTabChange,
    handleViewIndex,
  };

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

export default TabContextProvider;
