---
comments: true
excerpt: 'Placeholder' 
tags:
 - technical
 - database
publishDate: 2023-03-03T20:52:08.052481
last-modified-purpose:
slug: /software-blog/db-migration-script/
title: Migrating DB smoothly with a migration script
---

If you are transferring from one DB to another and want to make sure it happens properly, this is the mechanism you can use.

The same mechanism could be used to migrate multiple tables. And can be implemented in SQL stored procedure or stored procedure equivalent in the DB of your choice.

1. Add these additional columns to your source table
   1. **is_migrated**: default false
   2. **migrated_date**
   3. **is_error**
   4. **error_description**
2. Create a DB migration script which
   1. Copies a batch of data from one table in source DB to one table in dB.
   2. The batch size could be 1000. You don’t want the batch size to be too small because it could be slow. You don’t want it too high to be able to recover better.
   3. Whenever a batch is a complete update the is\_migrated and migrated\_date in the source DB. Then pick up the next batch where is_migrated is false.
   4. If there is an error, set **is_error** to\_ true \_and add **error_description**.
   5. The **error_description** could be an exception that is thrown.
   6. Once the script is done, check for **is_error: true** and fix those errors in the script itself.
3. Running
   1. Run the script by copying the data from PROD to your testing environment.
   2. Fix your scripts if you find **is_error: true**
   3. Once all is fixed, re-copy data from PROD to your testing environment and run again.
   4. You want to make sure everything works perfectly so that you won’t have to do much during the PROD run.
   5. Once you find all bugs are fixed, run the migration script in **PROD**.