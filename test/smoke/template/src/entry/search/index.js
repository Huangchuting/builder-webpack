import React from 'react'
import ReactDom from 'react-dom'
import '../../../common'
// import { a } from './tree-shaking'
import largeNumber from 'large-number'
import './search.less'
import '../../assets/fonts/iconfont.css'
import logo from '../../assets/images/task_2.png'

class Search extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            Text: null
        }
    }

    loadComponent() {
        import('./text.js').then((Text) => {
            this.setState({
                Text: Text.default
            })
        })
    }

    render() {
        const { Text } = this.state
        const addResult = largeNumber('999', '1')
        return <div className="search-text">
            {
                Text ? <Text/> : null
            }
            <img src={logo} alt="logo" onClick={this.loadComponent.bind(this)} />
            <span className="iconfont icon-plant-11"></span>
            Search Text233
            {addResult}
        </div>
    }
}

ReactDom.render(
    <Search/>,
    document.getElementById('root')
)