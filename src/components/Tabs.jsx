import React, { useState } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <div role="tablist" className="tabs tabs-bordered tabs-lg lg:w-[1000px] ">
        <a
          role="tab"
          href="/#hot"
          className={`tab ${activeTab == 0 && 'tab-active'}`}
          onClick={() => setActiveTab(0)}
        >
          🔥 Hot
        </a>
        <a
          role="tab"
          href="/#new"
          className={`tab ${activeTab == 1 && 'tab-active'}`}
          onClick={() => setActiveTab(1)}
        >
         ✨ New
        </a>
        <a
          role="tab"
          href="/#top"
          className={`tab ${activeTab == 2 && 'tab-active'}`}
          onClick={() => setActiveTab(2)}
        >
         🏆  Top
        </a>
      </div>
    </div>
  );
};

export default Tabs;
