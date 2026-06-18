// LPK zh-CN translation layer — injected via content directory
// Translates common English UI strings to Simplified Chinese at DOM ready
(function() {
  'use strict';

  // Only activate for zh-CN preference
  var lang = (navigator.language || '').toLowerCase();
  var param = new URLSearchParams(window.location.search).get('lang');
  if (!lang.startsWith('zh') && param !== 'zh' && param !== 'zh-CN') return;

  var dict = {
    // === Common / Universal ===
    'Home': '首页',
    'Dashboard': '控制台',
    'Admin': '管理',
    'Settings': '设置',
    'Configuration': '配置',
    'Login': '登录',
    'Logout': '退出登录',
    'Sign in': '登录',
    'Sign In': '登录',
    'Password': '密码',
    'Username': '用户名',
    'Submit': '提交',
    'Cancel': '取消',
    'Save': '保存',
    'Delete': '删除',
    'Edit': '编辑',
    'Create': '创建',
    'Search': '搜索',
    'Filter': '筛选',
    'Export': '导出',
    'Import': '导入',
    'Refresh': '刷新',
    'Loading': '加载中...',
    'Error': '错误',
    'Success': '成功',
    'Warning': '警告',
    'Info': '信息',
    'Close': '关闭',
    'Back': '返回',
    'Next': '下一步',
    'Previous': '上一步',
    'Finish': '完成',
    'Copy': '复制',
    'Copied': '已复制',
    'Download': '下载',
    'Upload': '上传',
    'Enable': '启用',
    'Disable': '禁用',
    'Enabled': '已启用',
    'Disabled': '已禁用',
    'Status': '状态',
    'Running': '运行中',
    'Stopped': '已停止',
    'Online': '在线',
    'Offline': '离线',
    'Active': '活跃',
    'Inactive': '非活跃',
    'Name': '名称',
    'Description': '描述',
    'Type': '类型',
    'Version': '版本',
    'Language': '语言',
    'Theme': '主题',
    'Dark': '深色',
    'Light': '浅色',
    'Auto': '自动',

    // === EasyProxy specific ===
    'EasyProxy': 'EasyProxy',
    'Universal HLS/M3U8 Proxy': '通用 HLS/M3U8 代理',
    'Stream Extractor': '流媒体提取器',
    'Playlist': '播放列表',
    'Builder': '构建器',
    'URL Generator': 'URL 生成器',
    'API Docs': 'API 文档',
    'API Key': 'API 密钥',
    'DVR': '录制',
    'Recording': '录制',
    'Recordings': '录制列表',
    'Extractor': '提取器',
    'Proxy': '代理',
    'Manifest': '清单',
    'Segment': '分片',
    'Stream': '流',
    'HLS': 'HLS',
    'M3U8': 'M3U8',
    'MPD': 'MPD',
    'DASH': 'DASH',
    'DRM': 'DRM',
    'License': '许可证',
    'Key': '密钥',
    'Keys': '密钥',
    'Provider': '提供商',
    'Channel': '频道',
    'Quality': '画质',
    'Resolution': '分辨率',
    'Bitrate': '码率',
    'FPS': '帧率',
    'Codec': '编码',
    'Duration': '时长',
    'Size': '大小',
    'Format': '格式',
    'Output': '输出',
    'Input': '输入',
    'Source': '来源',
    'Target': '目标',
    'URL': '链接',
    'Token': '令牌',
    'Session': '会话',
    'Profile': '配置',

    // === Date / Time ===
    'Today': '今天',
    'Yesterday': '昨天',
    'Tomorrow': '明天',
    'Last 7 days': '最近7天',
    'Last 30 days': '最近30天',
    'This month': '本月',
    'Last month': '上月',

    // === Actions ===
    'Add': '添加',
    'Remove': '移除',
    'Update': '更新',
    'Reset': '重置',
    'Clear': '清除',
    'Confirm': '确认',
    'Yes': '是',
    'No': '否',
    'OK': '确定',

    // === Messages ===
    'No data': '暂无数据',
    'No results': '无结果',
    'Are you sure?': '确定吗？',
    'Operation successful': '操作成功',
    'Operation failed': '操作失败',
    'Please try again': '请重试',
    'Something went wrong': '出了点问题',
    'Page not found': '页面未找到',
    'Access denied': '访问被拒绝',
    'Unauthorized': '未授权',
    'Forbidden': '禁止访问',
    'Rate limited': '请求过于频繁',
    'Connection error': '连接错误',
    'Network error': '网络错误',
    'Timeout': '超时',
    'Invalid input': '输入无效',
    'Required field': '必填字段',
  };

  function translateText(text) {
    var exact = dict[text];
    if (exact) return exact;
    // Try case-insensitive
    for (var key in dict) {
      if (key.toLowerCase() === text.toLowerCase()) return dict[key];
    }
    return null;
  }

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      var text = node.textContent.trim();
      if (text && text.length > 0 && text.length < 120) {
        var translated = translateText(text);
        if (translated) {
          node.textContent = node.textContent.replace(text, translated);
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Skip script, style, code, pre
      var tag = node.tagName.toLowerCase();
      if (tag === 'script' || tag === 'style' || tag === 'code' || tag === 'pre') return;

      // Translate placeholder attributes
      if (node.placeholder || node.getAttribute('placeholder')) {
        var ph = node.placeholder || node.getAttribute('placeholder');
        var t = translateText(ph);
        if (t) node.placeholder = t;
      }
      // Translate title attributes
      if (node.title) {
        var tt = translateText(node.title);
        if (tt) node.title = tt;
      }
      // Translate aria-labels
      if (node.getAttribute('aria-label')) {
        var al = translateText(node.getAttribute('aria-label'));
        if (al) node.setAttribute('aria-label', al);
      }
      // Translate value attributes for buttons/inputs
      if ((tag === 'input' && (node.type === 'submit' || node.type === 'button')) || tag === 'button') {
        if (node.value) {
          var vt = translateText(node.value);
          if (vt) node.value = vt;
        }
      }

      for (var i = 0; i < node.childNodes.length; i++) {
        walk(node.childNodes[i]);
      }
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { walk(document.body); });
  } else {
    walk(document.body);
  }

  // Observe for dynamically added content (SPA)
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === Node.ELEMENT_NODE) walk(node);
      });
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
