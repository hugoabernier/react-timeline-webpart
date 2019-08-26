import * as React from 'react';
import styles from './TimelineView.module.scss';
import { ITimelineViewProps, ITimelineViewState } from './ITimelineView.types';
import Timeline from "react-visjs-timeline";
import * as moment from "moment";
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { initializeIcons } from '@uifabric/icons';


initializeIcons();

const basicExample: any = {
  options: {
    start: "2014-04-10",
    end: "2014-04-30"
  },
  items: [
    {
      id: "A",
      content: "Period A",
      start: "2014-01-16",
      end: "2014-01-22",
      type: "background"
    },
    {
      id: "B",
      content: "Period B",
      start: "2014-01-25",
      end: "2014-01-30",
      type: "background",
      className: "negative"
    },
    { id: 1, content: "item 1", start: "2014-04-20" },
    { id: 2, content: "item 2", start: "2014-04-14" },
    { id: 3, content: "item 3", start: "2014-04-18" },
    { id: 4, content: "item 4", start: "2014-04-16", end: "2014-04-19" },
    { id: 5, content: "item 5", start: "2014-04-25" },
    { id: 6, content: "item 6", start: "2014-04-27", type: "point" }
  ]
};

const groupsExample: any = {
  groups: [],
  items: [],
  //   {
  //     id: "A",
  //     content: "Period A",
  //     start: "2019-01-16",
  //     end: "2019-01-22",
  //     type: "background"
  //   },
  //   {
  //     id: "B",
  //     content: "Period B",
  //     start: "2019-01-25",
  //     end: "2019-01-30",
  //     type: "background",
  //     className: "negative"
  //   },
  //   { id: 1, content: "item 1", start: "2019-04-20" },
  //   { id: 2, content: "item 2", start: "2019-04-14" },
  //   { id: 3, content: "item 3", start: "2019-04-18" },
  //   { id: 4, content: "item 4", start: "2019-04-16", end: "2019-04-19" },
  //   { id: 5, content: "item 5", start: "2019-04-25" },
  //   { id: 6, content: "item 6", start: "2019-04-27", type: "point" }
  // ],
  options: {
    groupOrder: "content" // groupOrder can be a property name or a sorting function
  }
};

const now: any = moment()
  .minutes(0)
  .seconds(0)
  .milliseconds(0);
const groupCount: number = 3;
const itemCount: number = 20;

// create a data set with groups
// const names: string[] = ["Subject", "Witness", "Complainant", "Employment"];
// for (let g: number = 0; g < groupCount; g++) {
//   groupsExample.groups.push({ id: g, content: names[g] });
// }

// create a dataset with items
for (let i: number = 0; i < itemCount; i++) {
  const start: any = now.clone().add(Math.random() * 30, "days");
  //const group: any = Math.floor(Math.random() * groupCount);
  groupsExample.items.push({
    id: i,
    //group: group,
    content: `Item <b>${i}</b>`,
    start: start,
    type: 'box',
    title: '<h1>Lorem ipsum dolor sit amet</h1><div>Consectetur adipiscing elit.</div>'
  });
}

const options: any = {
  stack: true,
  horizontalScroll: true,
  zoomKey: "ctrlKey",
  maxHeight: 400,
  minHeight: 400
};

export default class TimelineView extends React.Component<ITimelineViewProps, ITimelineViewState> {
  private timeline: any = undefined;
  // private _zoomItems: IContextualMenuItem[] = [
  //   {
  //     key: "zoomIn",
  //     name: "Zoom In",
  //     icon: "ZoomIn",
  //     ariaLabel: "Zoom In",
  //     ["data-automation-id"]: "ZoomInMenu",
  //     onClick: () => {
  //       this.zoomIn();
  //     },
  //     iconOnly: true
  //   },
  //   {
  //     key: "zoomOut",
  //     name: "Zoom Out",
  //     icon: "ZoomOut",
  //     ariaLabel: "Zoom Out",
  //     ["data-automation-id"]: "ZoomOutButton",
  //     onClick: () => {
  //       this.zoomOut();
  //     },
  //     iconOnly: true
  //   }
  // ];

  // private _panItems: IContextualMenuItem[] = [
  //   {
  //     key: "panFirst",
  //     name: "Pan to start",
  //     icon: "DoubleChevronLeft",
  //     ariaLabel: "Pan to start",
  //     ["data-automation-id"]: "ChevronLeftButton",
  //     onClick: () => {
  //       this.panFirst();
  //     },
  //     iconOnly: true
  //   },
  //   {
  //     key: "panLeft",
  //     name: "Pan left",
  //     icon: "ChevronLeft",
  //     ariaLabel: "Pan left",
  //     ["data-automation-id"]: "ChevronLeftButton",
  //     onClick: () => {
  //       this.panLeft();
  //     },
  //     iconOnly: true
  //   },
  //   {
  //     key: "panRight",
  //     name: "Pan right",
  //     icon: "ChevronRight",
  //     ariaLabel: "Pan right",
  //     ["data-automation-id"]: "ChevronRightButton",
  //     onClick: () => {
  //       this.panRight();
  //     },
  //     iconOnly: true
  //   },
  //   {
  //     key: "panLast",
  //     name: "Pan to end",
  //     icon: "DoubleChevronRight",
  //     ariaLabel: "Pan to end",
  //     ["data-automation-id"]: "ChevronRightButton",
  //     onClick: () => {
  //       this.panLast();
  //     },
  //     iconOnly: true
  //   }
  // ];

  constructor(props: ITimelineViewProps) {
    super(props);

    this.timeline = React.createRef();
    this.zoomIn = this.zoomIn.bind(this);
    this.state = {
      selectedIds: []
    };
  }

  public render(): React.ReactElement<ITimelineViewProps> {
    const commandBar: JSX.Element = this._renderCommandBar();

    return (
      <div className={styles.timelineView}>
        {commandBar}
        <Timeline
          ref={this.timeline}
          {...groupsExample}
          clickHandler={this._clickHandler.bind(this)}
          selection={this.state.selectedIds}
          options={options}
          moveable={true}
        />
      </div>
    );
  }

  private move(percentage: number) {
    const range = this.timeline.current.$el.range;

    const interval = range.end - range.start;

    const startDate = new Date(range.start - interval * percentage);
    const endDate = new Date(range.end - interval * percentage);

    this.timeline.current.$el.setWindow(startDate, endDate, {
      animation: { duration: 300, easingFunction: "easeOutCubic" }
    });
    //this.timeline.current.$el.setWindow(range.start, range.end);
  }

  protected _clickHandler = (props: any) => {
    // const { group } = props;
    // const selectedIds: number[] = groupsExample.items
    //   .filter(item => item.group === group)
    //   .map(item => item.id);
    // this.setState({
    //   selectedIds
    // });
  }

  private _renderCommandBar(): JSX.Element {
    //let menuItems: any[] = [];

    // 1 item selected, allow editing and deleting
    //menuItems = menuItems.concat(this._zoomItems, this._panItems);

    return <CommandBar
      items={[
        {
          key: 'panFirst',
          title: 'Move to start',
          //name: 'Pan to start',
          iconProps: {
            iconName: 'DoubleChevronLeft'
          },
          onClick: (ev: React.MouseEvent<HTMLElement>)=>this.panFirst(ev),
        },
        {
          key: 'panLeft',
          title: 'Move left',
          //name: 'Pan left',
          iconProps: {
            iconName: 'ChevronLeft'
          },
          onClick: (ev: React.MouseEvent<HTMLElement>)=>this.panLeft(ev),
        },
        {
          key: 'panRight',
          title: 'Move right',
          //name: 'Pan right',
          iconProps: {
            iconName: 'ChevronRight'
          },
          onClick: (ev: React.MouseEvent<HTMLElement>)=>this.panRight(ev),
        },
        {
          key: 'panLast',
          title: 'Move to end',
          //name: 'Pan to end',
          iconProps: {
            iconName: 'DoubleChevronRight'
          },
          onClick: (ev: React.MouseEvent<HTMLElement>)=>this.panLast(ev),
        },
        // {
        //   key: 'edit',
        //   name: 'Edit',
        //   iconProps: {
        //     iconName: 'Edit'
        //   },
        //   onClick: this.onEditItem,
        //   //disabled: this.state.disableCommandOption,
        // },
        // {
        //   key: 'delete',
        //   name: 'Delete',
        //   iconProps: {
        //     iconName: 'Delete'
        //   },
        //   onClick: this.onDeleteItem,
        //   //disabled: this.state.disableCommandOption,
        // },
        {
          key: 'zoomIn',
          title: 'Zoom in',
          iconProps: {
            iconName: 'ZoomIn'
          },
          onClick: (ev: React.MouseEvent<HTMLElement>)=>this.zoomIn(ev),
          //disabled: this.state.disableCommandOption,
        },
        {
          key: 'zoomOut',
          title: 'Zoom out',
          iconProps: {
            iconName: 'ZoomOut'
          },
          onClick: (ev: React.MouseEvent<HTMLElement>)=>this.zoomOut(ev),
          //disabled: this.state.disableCommandOption,
        },
      ]}
      farItems={[
        {
          key: 'refresh',
          //name: 'Refresh',
          title: 'Refresh',
          iconProps: {
            iconName: 'Refresh'
          },
          onClick: this.onRefresh,
        }
      ]}
    />;
  }

  private onRefresh(ev: React.MouseEvent<HTMLElement>) {
    ev.preventDefault();
    console.log("Refresh");
    // LoadTenantProperties
    //this.loadTenantProperties();
  }

  protected zoomIn(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    console.log("Zoom in");
    this.timeline.current.$el.zoomIn(0.2);
  }
  protected zoomOut(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    console.log("Zoom out");
    this.timeline.current.$el.zoomOut(0.2);
  }

  protected panLeft(ev: React.MouseEvent<HTMLElement>) {
    ev.preventDefault();
    console.log("Pan left");
    this.move(0.2);
  }

  protected panRight(ev: React.MouseEvent<HTMLElement>) {
    ev.preventDefault();
    console.log("Pan right");
    this.move(-0.2);
  }

  protected panFirst(ev: React.MouseEvent<HTMLElement>) {
    ev.preventDefault();
    console.log("Pan first");
    const range = this.timeline.current.$el.range;

    const interval = range.end - range.start;

    const itemRange = this.timeline.current.$el.getItemRange();
    var startDate: Date = itemRange.min;
    var endDate = moment(startDate).add(interval);

    this.timeline.current.$el.setWindow(startDate, endDate, {
      animation: { duration: 600, easingFunction: "easeOutCubic" }
    });
  }

  protected panLast(ev: React.MouseEvent<HTMLElement>) {
    ev.preventDefault();
    console.log("Pan last");
    var range = this.timeline.current.$el.range;

    var interval = range.end - range.start;

    var itemRange = this.timeline.current.$el.getItemRange();
    //var startDate: Date = this.timeline.current.$el.itemSet.items[0].data.start;
    var endDate: Date = itemRange.max;
    var startDate = moment(endDate).add(-interval);

    this.timeline.current.$el.setWindow(startDate, endDate, {
      animation: { duration: 600, easingFunction: "easeOutCubic" }
    });
  }
}
