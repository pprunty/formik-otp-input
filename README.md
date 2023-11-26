# React Native Snap Scroll

This package provides a React Native component that implements TikTok style vertical snap scrolling.

## Installation

Install the package by running:

```sh
npm install react-native-snap-scroll
```

## Usage

Import `SnapScrollView` and `SnapScrollViewItem` from the package and use them in your component.

```jsx
import {SnapScrollView, SnapScrollViewItem} from 'react-native-snap-scroll';

// ...

<SnapScrollView>
  {data.map((item, index) => (
    <SnapScrollViewItem key={index}>
      {/* Your content */}
    </SnapScrollViewItem>
  ))}
</SnapScrollView>
```

## License

This project is licensed under the MIT License.
