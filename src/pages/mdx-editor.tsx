import { observer } from 'mobx-react';
import { useState } from 'react';

import { MarkdownEditor } from '@components/markdown-editor';

export default observer(function Page() {
  const [value, setValue] = useState('');

  return (
    <div className={'p-2'}>
      <MarkdownEditor initialValue={initialValue} value={value} setValue={(value: string) => {}} />
    </div>
  );
});

const initialValue = `# Title
#### Subtitle
<hr />
paragraph **bold** 

| Month    | Savings |
| -------- | ------- |
| January  | $250 <b>save</b>   |
| February | $80     |
| March    | $420    |

<Block fill>Text</Block>

<br />

<img className="w-[600px]" src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220630132824/HTML-Full-Form.jpg"  />


<br /><br />

\`\`\`typescript
import { Title } from '@components/title';

<Title>Title Component</Title>;
\`\`\`

> one line note

<Note>
\tmultiple 
\t<br />
\tlines
</Note>
`;
