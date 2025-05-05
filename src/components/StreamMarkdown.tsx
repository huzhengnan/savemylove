import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface StreamMarkdownProps {
  content: string;
  loading?: boolean;
  className?: string;
  autoScroll?: boolean;
  onScroll?: () => void;
}

const StreamMarkdown: React.FC<StreamMarkdownProps> = ({
  content,
  loading,
  className = '',
  autoScroll = true,
  onScroll,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isUserScrolling = useRef(false);
  const lastContentLength = useRef(0);
  const [processedContent, setProcessedContent] = useState(content);

  // 处理内容格式化
  useEffect(() => {
    // 处理表格格式
    const formatTable = (text: string) => {
      const lines = text.split('\n');
      const formattedLines = [];
      let isInTable = false;
      let columnCount = 0;
      let headerProcessed = false;

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        // 检测表格开始
        if (line.startsWith('|') && line.endsWith('|')) {
          // 忽略纯分隔符行
          if (line.replace(/[\|\s-]/g, '').length === 0) {
            continue;
          }

          // 计算列数（排除首尾的分隔符）
          const currentColumnCount = (line.match(/\|/g) || []).length - 1;
          
          if (!isInTable) {
            // 新表格开始
            isInTable = true;
            columnCount = currentColumnCount;
            headerProcessed = false;
            
            // 规范化表头行
            const headerCells = line.split('|')
              .slice(1, -1)
              .map(cell => cell.trim());
            
            // 确保列数一致
            while (headerCells.length < columnCount) headerCells.push('');
            if (headerCells.length > columnCount) headerCells.length = columnCount;
            
            // 添加格式化的表头
            formattedLines.push('| ' + headerCells.join(' | ') + ' |');
            
            // 添加分隔行，确保对齐标记
            formattedLines.push('|' + ' :---: |'.repeat(columnCount));
            headerProcessed = true;
          } else {
            // 处理数据行
            const cells = line.split('|')
              .slice(1, -1)
              .map(cell => cell.trim());
            
            // 确保列数一致
            while (cells.length < columnCount) cells.push('');
            if (cells.length > columnCount) cells.length = columnCount;
            
            // 添加格式化的数据行
            formattedLines.push('| ' + cells.join(' | ') + ' |');
          }
        } else {
          // 检测表格结束
          if (isInTable) {
            isInTable = false;
            headerProcessed = false;
            formattedLines.push(''); // 添加空行分隔
          }
          formattedLines.push(line);
        }
      }

      return formattedLines.join('\n');
    };

    // 格式化内容
    let formatted = content
      // 修复列表格式
      .replace(/^[•-]\s/gm, '- ')
      // 确保标题格式正确
      .replace(/^(#+)([^\s#])/gm, '$1 $2')
      // 移除多余的空行
      .replace(/\n{3,}/g, '\n\n');

    // 处理表格
    formatted = formatTable(formatted);

    // 如果内容以 # 开头但没有换行，添加换行
    if (formatted.startsWith('#') && !formatted.startsWith('#\n')) {
      formatted = '\n' + formatted;
    }

    console.log('Content processed:', {
      original: content.length,
      formatted: formatted.length,
      hasTable: formatted.includes('|'),
      hasList: formatted.includes('- '),
      formattedContent: formatted
    });

    setProcessedContent(formatted);
  }, [content]);

  useEffect(() => {
    console.log('Content updated:', {
      contentLength: processedContent.length,
      lastLength: lastContentLength.current,
      isAutoScroll: autoScroll,
      isUserScrolling: isUserScrolling.current
    });

    if (processedContent.length > lastContentLength.current && autoScroll && !isUserScrolling.current) {
      const container = containerRef.current;
      if (container) {
        try {
          requestAnimationFrame(() => {
            container.scrollTop = container.scrollHeight;
            console.log('Scrolled to bottom:', {
              scrollTop: container.scrollTop,
              scrollHeight: container.scrollHeight
            });
          });
        } catch (error) {
          console.error('Error during scroll:', error);
        }
      }
    }

    lastContentLength.current = processedContent.length;
  }, [processedContent, autoScroll]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const isAtBottom = Math.abs(
      (container.scrollHeight - container.scrollTop) - container.clientHeight
    ) < 10;

    isUserScrolling.current = !isAtBottom;
    console.log('Scroll event:', {
      isAtBottom,
      isUserScrolling: isUserScrolling.current,
      scrollTop: container.scrollTop,
      scrollHeight: container.scrollHeight,
      clientHeight: container.clientHeight
    });

    onScroll?.();
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={`prose prose-pink max-w-none min-h-[20px] overflow-y-auto
        bg-gradient-to-b from-pink-50/50 to-purple-50/50
        p-4 rounded-lg shadow-inner
        ${className}
        
        // 自定义表格样式
        [&_table]:w-full
        [&_table]:border-collapse
        [&_table]:my-4
        
        [&_th]:bg-pink-100/50
        [&_th]:font-semibold
        [&_th]:p-2
        [&_th]:border
        [&_th]:border-pink-200
        
        [&_td]:p-2
        [&_td]:border
        [&_td]:border-pink-100
        
        [&_tr:nth-child(even)]:bg-pink-50/30
        [&_tr:hover]:bg-pink-100/40
        
        // 列表样式
        [&_ul]:list-disc
        [&_ul]:pl-5
        [&_ol]:list-decimal
        [&_ol]:pl-5
        
        // 引用块样式
        [&_blockquote]:border-l-4
        [&_blockquote]:border-pink-300
        [&_blockquote]:pl-4
        [&_blockquote]:italic
        [&_blockquote]:text-gray-700
        
        // 代码块样式
        [&_pre]:bg-gray-900
        [&_pre]:text-gray-100
        [&_pre]:p-4
        [&_pre]:rounded-lg
        [&_pre]:overflow-x-auto
        
        // 内联代码样式
        [&_code]:bg-pink-50
        [&_code]:text-pink-700
        [&_code]:px-1.5
        [&_code]:py-0.5
        [&_code]:rounded
        
        // 标题样式
        [&_h1]:text-3xl
        [&_h1]:font-bold
        [&_h1]:mb-4
        [&_h2]:text-2xl
        [&_h2]:font-semibold
        [&_h2]:mb-3
        [&_h3]:text-xl
        [&_h3]:font-medium
        [&_h3]:mb-2
        
        // 链接样式
        [&_a]:text-pink-600
        [&_a]:hover:text-pink-700
        [&_a]:underline
        
        // 分割线样式
        [&_hr]:border-pink-200
        [&_hr]:my-6
        
        // 段落样式
        [&_p]:leading-7
        [&_p]:mb-4
        
        // 加载状态样式
        ${loading ? 'opacity-70' : 'opacity-100'}
      `}
    >
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto">
              <table {...props} />
            </div>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
      {loading && (
        <div className="flex items-center justify-center space-x-2 text-pink-500 text-sm mt-4">
          <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      )}
    </div>
  );
};

export default StreamMarkdown; 