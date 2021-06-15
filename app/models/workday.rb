class Workday < ApplicationRecord
    belongs_to :user

    def schedule
        start_minutes = "00"
        end_minutes = "00"

        if self.start_min != 0
            start_minutes = self.start_min.to_s
        end

        if self.end_min != 0
            end_minutes = self.end_min.to_s
        end

        return self.start_hour.to_s + ":" + start_minutes + " " + self.start_am_or_pm.to_s + " - " + self.end_hour.to_s+ ":" + end_minutes + " " + self.end_am_or_pm.to_s
    end
    
end
