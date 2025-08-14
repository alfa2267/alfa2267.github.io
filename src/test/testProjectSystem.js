// Simple test for the dynamic project system
import ProjectService from '../services/projectService.js';
import ReadmeParser from '../services/readmeParser.js';

export const testProjectSystem = async () => {
  console.log('🧪 Testing Dynamic Project System...');
  
  try {
    const projectService = new ProjectService();
    const parser = new ReadmeParser();
    
    console.log('📖 Testing README parsing with sample data...');
    
    // Test with sample README content (simulating your portfolio README)
    const sampleReadme = `
# Sample Project

Some description here.

<!-- PROJECT-META-START -->
\`\`\`yaml
project:
  name: "Test Project"
  slug: "test-project"
  description: "A test project for validation"
  status: "active"
  category: "test"
  tech_stack: ["JavaScript", "React"]
  demo_url: "https://example.com"
  repo_url: "https://github.com/alfa2267/test"
  priority: 1
  show_in_nav: true
  icon: "dashboard"
  features:
    - "Feature 1"
    - "Feature 2"
\`\`\`
<!-- PROJECT-META-END -->

More content...
    `;
    
    const metadata = parser.parseProjectMetadata(sampleReadme);
    console.log('✅ Parsed metadata:', metadata);
    
    console.log('🔄 Testing menu generation...');
    const menuItems = await projectService.generateMenuItems();
    console.log('✅ Generated menu items:', menuItems.length, 'items');
    
    // Log first few menu items to verify structure
    console.log('📋 Sample menu items:');
    menuItems.slice(0, 5).forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.title || item.subheader || '[Label]'}`);
    });
    
    console.log('🎉 Project system test completed successfully!');
    return { success: true, menuItems, metadata };
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return { success: false, error };
  }
};

// Auto-run test in development
if (process.env.NODE_ENV === 'development') {
  console.log('🚀 Auto-running project system test...');
  testProjectSystem().then(result => {
    if (result.success) {
      console.log('✨ All tests passed! The dynamic project system is working.');
    } else {
      console.log('🔧 Test failed - check implementation.');
    }
  });
}