import { Tabs } from "@/components/Tabs";
import { TabContent } from "@/components/TabContent";
import Dice from '@/games/dice'
import Crash from '@/games/crash'


export const MainPage = ({ activeTab, setActiveTab, activeModal }) => {
  return (
    <div className="p-6">
      {activeTab && activeModal=='Profile' ? (
        <>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabContent activeTab={activeTab} />
        </>
      ) : (
        <>
          {activeModal == 'Dice' ? (
            <Dice/>
          ) : activeModal == 'Crash' ? (
            <Crash/>
          ): (
            // <Home/>
            <h1>Home</h1>
          )}
        </>
      )}
    </div>
  );
};