export const handleScrollClick = (
  direction,
  setScrollPosition,
  containerId
) => {
  const container = document.getElementById(containerId);
  const containerScrollPosition = container.scrollLeft;
  const containerWidth = container.offsetWidth;

  let newPosition = containerScrollPosition;

  if (direction === 'left') {
    newPosition -= containerWidth;
  } else if (direction === 'right') {
    newPosition += containerWidth;
  }

  if (newPosition < 0) {
    newPosition = 0;
  } else if (newPosition > container.scrollWidth - containerWidth) {
    newPosition = container.scrollWidth - containerWidth;
  }

  setScrollPosition(newPosition);
  container.scrollTo({ left: newPosition, behavior: 'smooth' });
};
