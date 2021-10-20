# A3 Project Goal
In this project, we are interested in examining TESLA's stock price fluctuations. Since Tesla's stock price have been fluctuating for the past few months, we were interested in how the stock price line changes in different situations, looking at the price's high, low, open, and close.


# Design Decisions
We thought a line chart would work best if we wanted to show a trend for stock price. We intended to create a filter with "high", "low", "open", "close" to see the changes in the stock price line in different situations.

# Overview of your development process

We both spent a whole day ( ~16 hours) coding from our end and 2 hours to meet and compile the online file. (in total, 15-16 hours per person)
We spent some time trying to clone the Github file to the local document, and using VScode to push updates. We found the dataset from Koggle, and there's no missing value in the dataset. To make the chart interactive, we looked at different online tutorials and found  Graph Gallery to be really helpful. We followed the code instructions and modified the code based on our own needs.
One challenge we encountered was to make the "main.js" work on the HTML file. We still do not know why, but when deleting "type=module" in the <scrip> code, the javascript codes were then able to be reflected in the HTML file. Another challenge we encountered was that we realized that we had to change the dataset format so that the js code can read the data by columns. We used a dictionary to accommodate elements into the file. We also used tParser to convert strings into date data.
