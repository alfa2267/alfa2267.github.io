import React from 'react';
import PageContainer from 'src/components/container/PageContainer';

// components
import MyProjects from './components/MyProjects';
import WorkCapacity from './components/WorkCapacity';
import RecentActivity from './components/RecentAcitvity';
import MonthlyActivity from './components/MonthlyActivity';
import AboutMe from './components/AboutMe';
import ReleaseHealth from './components/ReleaseHealth';
import ProductDiscoveryPipeline from './components/ProductDiscoveryPipeline';
import DevOpsQuirks from './components/DevOpsQuirks';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Release Health */}
        <div style={{
          display: 'flex',
          gap: '32px',
          flexDirection: window.innerWidth < 1200 ? 'column' : 'row'
        }}>
          <div style={{ flex: '1', minWidth: 0 }}>
            <ReleaseHealth />
          </div>
        </div>

        {/* Top row - Chart and side cards */}
        <div style={{
          display: 'flex',
          gap: '24px',
          flexDirection: window.innerWidth < 1200 ? 'column' : 'row',
          minHeight: '500px'
        }}>
          <div style={{ flex: '2' }}>
            <MyProjects />
          </div>
          <div style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            height: '100%'
          }}>
            <div style={{ flex: '0 0 auto' }}>
              <WorkCapacity />
            </div>
            <div style={{ flex: '1', minHeight: '0' }}>
              <MonthlyActivity />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          gap: '24px',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          alignItems: 'stretch'
        }}>
          <div style={{ flex: '1', height: '100%' }}>
            <RecentActivity />
          </div>
          <div style={{ flex: '1', height: '100%' }}>
            <AboutMe />
          </div>
          <div style={{ flex: '1', height: '100%' }}>
            <DevOpsQuirks />
          </div>
        </div>

        {/* Product Discovery Pipeline - Own row */}
        <div style={{
          display: 'flex',
          gap: '24px',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          alignItems: 'stretch'
        }}>
          <div style={{ flex: '1', height: '100%' }}>
            <ProductDiscoveryPipeline />
          </div>
        </div>

      </div>
    </PageContainer>
  );
};

export default Dashboard;
