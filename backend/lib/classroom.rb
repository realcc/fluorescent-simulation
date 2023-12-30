class Classroom
  TUBE_UNIT_COUNT = 4

  attr_accessor :units
  attr_reader :total_replacement, :total_cost

  def initialize
    @total_replacement = 0
    @total_cost = 0
    @units = Array.new(TUBE_UNIT_COUNT) { FluorescentTubeUnit.new }
  end

  def initialize_copy(copy)
    copy.units = @units.deep_dup
    super
  end

  def use_for_an_hour
    @units.each(&:use_for_an_hour)
    self.check_and_replace_tubes
  end

  def check_and_replace_tubes
    @units.each { |unit|
      if unit.needs_replacement?
        unit.replace_tubes
        @total_replacement += 1
        @total_cost += FluorescentTubeUnit::REPLACEMENT_COST * FluorescentTubeUnit::TUBE_COUNT
      end
    }
  end
end