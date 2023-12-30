class CreateSimulationResults < ActiveRecord::Migration[6.1]
  def change
    create_table :simulation_results do |t|
      t.integer :tubes_broken
      t.float :cost_per_year
      t.timestamps
    end
  end
end
