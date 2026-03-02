// 测试API功能
const testApi = async () => {
  const testText = "今天给大家分享一个快速学习的方法，只需要每天坚持30分钟，一个月后你就能看到明显进步。";
  
  console.log('测试文案:', testText);
  console.log('测试API端点: http://localhost:3000/api/generate');
  
  try {
    const response = await fetch('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: testText,
        variant: 'emotional'
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ API测试成功！');
      console.log('生成结果:', data.result.substring(0, 200) + '...');
      console.log('变体类型:', data.variant);
      console.log('原文长度:', data.originalLength);
      console.log('生成长度:', data.generatedLength);
    } else {
      console.log('❌ API测试失败:', data.error);
    }
  } catch (error) {
    console.log('❌ 请求失败:', error.message);
  }
};

// 运行测试
testApi();