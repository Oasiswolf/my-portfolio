import React, { Component } from 'react'

import PortfolioItem from './portfolio-item'

export default class PortFolioContainer extends Component {
  constructor() {
    super()

  }

  portfolioItems() {
    const data = ["Quip","EventBrite","Ministry Safe"]

    return data.map(item => {
      return <h3>{item}</h3>
    })
  }
  
  render() {
    return (
      <div>PortFolio Items Go Here

      {this.portfolioItems()}
      </div>
    )
  }
}
