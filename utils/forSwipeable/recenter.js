export default (currentRef) => {
  const animationFn = currentRef.props.swipeReleaseAnimationFn;
  const animationConfig = currentRef.props.swipeReleaseAnimationConfig;

  const { pan } = currentRef.state;
  currentRef.setState({
    lastOffset: { x: 0, y: 0 },
    leftActionActivated: false,
    leftButtonsActivated: false,
    leftButtonsOpen: false,
    rightActionActivated: false,
    rightButtonsActivated: false,
    rightButtonsOpen: false,
  });
  pan.flattenOffset();
  animationFn(pan, animationConfig).start();
};
