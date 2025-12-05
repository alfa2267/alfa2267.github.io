import React from 'react';
import PageContainer from 'src/components/container/PageContainer';

// components
import MyProjects from './components/MyProjects';
import WorkCapacity from './components/WorkCapacity';
import RecentActivity from './components/RecentAcitvity';
import MonthlyActivity from './components/MonthlyActivity';
import AboutMe from './components/AboutMe';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
        </div>

        {/* Testimonials and Newsletter row */}
        <div style={{ 
          display: 'flex', 
          gap: '24px',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          alignItems: 'stretch'
        }}>
          <div style={{ flex: '1', height: '100%' }}>
            <Testimonials />
          </div>
          <div style={{ flex: '1', height: '100%' }}>
            <Newsletter />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
