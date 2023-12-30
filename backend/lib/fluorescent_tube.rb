class FluorescentTube
  LIFESPAN = (100..200).freeze

  attr_reader :hours_left

  def initialize
    @hours_left = rand(LIFESPAN)
  end

  def use_for_an_hour
    @hours_left -= 1
  end

  def needs_replacement?
    @hours_left <= 0
  end
end
