FILES = %w(
  Initialize
  utils/Log
  events/Delegate
  utils/MathUtils
  utils/ObjectUtils
  utils/ArrayUtils
  utils/ClassUtils
  utils/StringUtils
  utils/DateUtils
  utils/ElementUtils
  utils/EventUtils
  utils/Toggler
  utils/ClassToggler
  modules/Locator
  events/DelegateCollection
  events/CustomEvent
  events/MouseController
  math/Point
  math/Rectangle
  dom/ElementBuilder
  dom/Selector
  events/Clock
  data/List
  data/Queue
  events/QueuedClock
  net/Ajax
  ui/containers/ModalBox
  ui/DatePicker
  ui/Flash
  ui/ScreenManager
  ui/Tabs
  tween/Base
  tween/Fade
  tween/Reveal
  Finalize
)

open('art.ff.js', 'w') do |output|
  FILES.each do |i|
    open("com/arthwood/#{i}.js", 'r') do |input|
      output << input.read.gsub(/\n/, '').gsub(/\s{2,}/, '')
      output << "\n"
    end
  end
end
