---
layout: post
title: "Creating iPhone Ringtones Using iTunes"
date: 2012-02-09T07:42:00
comments: true
tags:
- nerdliness
link: false
---
Here are the steps I use to create ringtones from music in my iTunes library.

**Step 1**  
Launch iTunes and pick the track you want to convert to a ringtone.

**Step 2**  
Right-click on the track and select "Get Info" from the context menu to see the track's properties.

**Step 3**  
Select the "Options" tab. Check both the "Start time" and "Stop time" radio boxes to isolate the portion of the track you want to use as your ring tone. Make sure not to select more than 30 seconds otherwise iTunes won't recognize it as a ringtone. To capture the first 30 seconds of a track you would set "Start Time" to 0:00, and "Stop Time" to "0:30". Once you have the start and stop times set, click "OK" to confirm your settings. 

**Step 4**  
Right-click on the track once more and select "Create AAC Version" from the context menu.

**Step 5**  
iTunes will now create a new track by copying the portion you identified in Step 3 above. This new track is the one you'll work with in the following steps.

**Step 6**  
Now, right-click the newly created track and select "Show in Finder". (Windows users should select "Show in Windows Explorer".)

**Step 7**  
When Finder (or Windows Explorer) open, the newly created ringtone track should be already selected. Rename the file extension to `.m4r` from `.m4a`. "R" for ringtone. You may have to confirm changing the extension.

**Step 8**  
Now we need to remove the `.m4a` version from iTunes and import the `.m4r` version. Return to iTunes, right-click the ringtone track you created and select "Delete".

**Step 9**  
Click "Remove" to confirm the removal and then click "Keep File" when you are prompted. This will tell iTunes to remove the ringtone track you created from the iTunes library but keep the actual file.

**Step 10**  
Return to Finder (or Windows Explorer) and double-click on the ringtone file (`.m4r`) you just renamed. The ringtone will be automatically added to the iTuned ringtone library. You can now sync it to your iPhone using iTunes.

Final note: Don't forget to return to the original track and remove the check marks next to "Start Time" and "Stop Time" otherwise the next time you play the track you'll only hear those few seconds of the track.
