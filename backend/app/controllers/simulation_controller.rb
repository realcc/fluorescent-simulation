class SimulationController < ApplicationController
  TOTAL_MONTHS = 9
  WEEKS_PER_MONTH = 4
  WORKDAYS_PER_WEEK = 5
  HOURS_PER_DAY = 15

  def index
    classroom = Classroom.new
    histories = Array.new
    histories.push(classroom.deep_dup)
    TOTAL_MONTHS.times do
      WEEKS_PER_MONTH.times do
        WORKDAYS_PER_WEEK.times do
          HOURS_PER_DAY.times do
            classroom.use_for_an_hour
            histories.push(classroom.deep_dup)
          end
        end
      end
    end

    result = SimulationResult.create(
      tubes_broken: classroom.total_replacement,
      cost_per_year: classroom.total_cost
    )

    render json: {
      result: result,
      histories: histories,
    }
  end
end
