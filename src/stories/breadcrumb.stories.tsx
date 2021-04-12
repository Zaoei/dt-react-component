import React from 'react'
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import { PropsTable } from './components/propsTable';
import Breadcrumb from '../components/breadcrumb';
import ExampleContainer from './components/exampleCode';

const stories = storiesOf('Breadcrumb 与路由结合', module);
stories.addDecorator(withKnobs)

const otherDependencies = `import { Breadcrumb } from 'dt-react-component'`
const code = `<Breadcrumb/>`
const propDefinitions = [
    {
        property: 'routes',
        propType: 'array',
        required: true,
        description: 'router的路由栈信息',
        defaultValue: 'routes[]'
    }, {
        property: 'style',
        propType: 'object',
        required: false,
        description: '面包屑组件样式',
        defaultValue: '--'
    }
]

stories.add('Breadcrumb 面包屑', () => {
    const groupId = 'circle';
    const defaultStyle = {
        background: 'dedede'
    }
    const style = object('Style', defaultStyle, groupId);

    return (
        <div className='story_wrapper'>
            <h2>何时使用</h2>
            <p>{` 当 breadcrumb 组件与 react-router 一起使用时，默认生成的 url 路径是带有 # 的`}</p>
            <p> {` 依赖需要满足 两级以上的层级结构并需要向上导航的路由时 `}</p>
            <h2>示例</h2>
            <ExampleContainer otherDependencies={otherDependencies} code={code} hasCodeSandBox={true}>
                <Breadcrumb routes = {[{ name: 'home', path: '/home' }, { name: 'about', path: '/about' }]}/>
            </ExampleContainer>
            <p style={{ marginTop: '10px' }}>通过自定义 style 属性控制背景颜色</p>
            <div className='strory-code_border'>
                <Breadcrumb routes = {[{ name: 'home', path: '/home' }, { name: 'about', path: '/about' }]} style={style}></Breadcrumb>&nbsp;
            </div>
        </div>
    )
}, {
    info: {
        text: `
            代码示例：
            ~~~js
            <Breadcrumb
                routes = {[{ name: 'home', path: '/home' }, { name: 'about', path: '/about' }]}
                style = {{ background: 'dedede' }}
            />
            ~~~
        `,
        TableComponent: () => PropsTable({ propDefinitions })
    }
})
