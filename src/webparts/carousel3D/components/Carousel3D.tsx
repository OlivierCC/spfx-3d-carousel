import * as React from 'react';
import { css } from 'office-ui-fabric-react';

import styles from '../Carousel3D.module.scss';
import { ICarousel3DWebPartProps } from '../ICarousel3DWebPartProps';

require('jquery');
require('jqueryreflection');
require('cloud9carousel');

import * as $ from 'jquery';

export interface ICarousel3DProps extends ICarousel3DWebPartProps {
}

export default class Carousel3D extends React.Component<ICarousel3DProps, {}> {

  public componentDidUpdate(prevProps: ICarousel3DProps, prevState: any): void {
    if (($ as any)('#carousel') != null) {
      ($ as any)('#carousel').Cloud9Carousel({
        buttonLeft: $("#buttons > .left"),
        buttonRight: $("#buttons > .right"),
        autoPlay: this.props.autoPlay === true ? 1 : 0,
        autoPlayDelay: this.props.autoPlayDelay,
        bringToFront: this.props.bringToFront,
        speed: this.props.speed,
        yOrigin: this.props.yOrigin,
        yRadius: this.props.yRadius,
        xOrigin: this.props.xOrigin,
        xRadius: this.props.xRadius,
        mirror: {
          gap: this.props.mirrorGap,
          height: this.props.mirrorHeight,
          opacity: this.props.mirrorOpacity
        },
        onRendered: this.rendered,
        onLoaded: function() {
          $("#carousel").css( 'visibility', 'visible' );
          $("#carousel").css( 'display', 'block' );
          $("#carousel").css( 'overflow', 'visible' );
          $("#carousel").fadeIn( 1500 );
        }
      });
    }
  }

  private rendered(carousel: any) {
        $('#item-title').text( carousel.nearestItem().element.alt )

        // Fade in based on proximity of the item
        var c = Math.cos((carousel.floatIndex() % 1) * 2 * Math.PI)
        $('#item-title').css('opacity', 0.5 + (0.5 * c))
  }

  public render(): JSX.Element {
    var items = this.props.items != null ? this.props.items : [];
    return (

       <div style={{height:'400px'}}>

        <div id="carousel">
          {items.map(item => {
              return (
                <img className="cloud9-item" style={{cursor: 'pointer'}} src={item.Picture} height="200" alt={item.Title}/>
              );

          })
          }
        </div>

        {this.props.showTitle === true ?
        <p id="item-title">&nbsp;</p>
        : ''}

        {this.props.showButton === true ?
        <div id="buttons" style={{paddingTop: '100px'}}>
          <button className="left" style={{float: 'left', height: '60px', cursor: 'pointer'}}>
            <i className='ms-Icon ms-Icon--ChevronLeft' aria-hidden="true" style={{fontSize:'large'}}></i>
          </button>
          <button className="right" style={{float: 'right', height: '60px', cursor: 'pointer'}}>
            <i className='ms-Icon ms-Icon--ChevronRight' aria-hidden="true" style={{fontSize:'large'}}></i>
          </button>
        </div>
        : ''}

      </div>

    );
  }
}
