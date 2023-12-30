class FluorescentTubeUnit
  TUBE_COUNT = 4
  REPLACEMENT_THRESHOLD = 2
  REPLACEMENT_COST = 7

  attr_accessor :tubes

  def initialize
    @tubes = Array.new(TUBE_COUNT) { FluorescentTube.new }
  end

  def initialize_copy(copy)
    copy.tubes = @tubes.deep_dup
    super
  end

  def use_for_an_hour
    @tubes.each(&:use_for_an_hour)
  end

  def needs_replacement?
    @tubes.count(&:needs_replacement?) >= REPLACEMENT_THRESHOLD
  end

  def replace_tubes
    @tubes = Array.new(TUBE_COUNT) { FluorescentTube.new }
  end
end
