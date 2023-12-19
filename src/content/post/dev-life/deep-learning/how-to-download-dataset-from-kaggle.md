---
toc: false
comments: true
excerpt: Using Kaggle CLI
tags:
 - deep-learning
publishDate: 2019-08-10T20:42:15.065727
title: How To Download Dataset From Kaggle
slug: /download_kaggle/
---

### 2 Sentence Pre-requisite:

1. Kaggle is a **platform** for **data science** where you can **find** **competitions**, **datasets**, and **other’s solutions**.

1. **Some** Kaggle **datasets** **cannot** be **downloaded** **directly** and can **only** **be downloaded** through Kaggle **via** it’s **CLI**.

## The Setup (One-time activity)

## 1 — Install Kaggle CLI

To get started to Kaggle CLI you will need Python, open terminal and write
```shell
$ pip install kaggle
```
## 2 — API credentials

Once you have Kaggle installed, type **kaggle** to check it is installed and you will get an output similar to this

![1_API_credentials]({{ site.baseurl }}/images/2019-08-10-how-to-download-dataset-from-kaggle/1_API_credentials.png)

In the above line, you will see the path (highlighted) of where to put your **kaggle.json** file.

To get kaggle.json file go to:
```
https://www.kaggle.com/<username>/account
```
In the API section, click **Create New API Token**. And copy it the path mentioned in the terminal output.

![2_download_kagglejson]({{ site.baseurl }}/images/2019-08-10-how-to-download-dataset-from-kaggle/2_download_kagglejson.png)

Type **kaggle** once again to check.

![3_chmod]({{ site.baseurl }}/images/2019-08-10-how-to-download-dataset-from-kaggle/3_chmod.png)

In my case, even after copying it was not working. I had the file in place but it did not have the right permissions so I had to type the exact command they gave me. And it started working.

## Downloading Dataset via CLI

You can open **kaggle help** via
```shell
kaggle -h
```
For getting info on competitions you can type
```shell
kaggle competitions download -h
```
whatever the Kaggle CLI command is, add -h to get help.

### Find Data

while you can explore Competitions, Datasets, and kernels via Kaggle, here I am going to only focus on downloading of datasets.

What I do is I explore competitions or datasets via Kaggle website.

### Download Entire Dataset

To download the dataset, go to **Data** *subtab. *In API section you will find the exact command that you can copy to the terminal to download the entire dataset.

![4_finding_download_command_on_competition_page]({{ site.baseurl }}/images/2019-08-10-how-to-download-dataset-from-kaggle/4_finding_download_command_on_competition_page.png)

![5_download_command_in_terminal]({{ site.baseurl }}/images/2019-08-10-how-to-download-dataset-from-kaggle/5_download_command_in_terminal.png)

The syntax is like
```shell
kaggle competitions download <competition name>
```
### Download Particular File From Dataset

As you can see, the size of the data is 34 GB which is huge.

So instead of downloading entire dataset, you can **select which files to download**.

You cannot provide download multiple files with a single command (as of 2019/Aug/10) so you will have to download it one by one using the following command.
```shell
kaggle competitions download -f <file-name> <competition-name>
```
![6_final_output]({{ site.baseurl }}/images/2019-08-10-how-to-download-dataset-from-kaggle/6_final_output.png)

Extract it and start using it.

I usually (plan to) put up a blog post every Saturday and create a YouTube video about it. My next post is a collection of Google Collab tips which will also include a way to download data from Kaggle into collab.

If there are any other useful tips/link/suggestion you would like to share, please put in the comment section below.

I respond to all my comments.

Thank you for reading so far. Have a good day.
