import json
import boto3
import StringIO
import zipfile
import mimetypes

def lambda_handler(event, context):
    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:eu-west-2:292122887681:deployReactTutorial')
    
    location = {
        "bucketName": "react-redux-tutorial-build.chaoshamster.com",
        "objectKey": "buildReactReduxTutorial.zip" 
    }
    
    try:
        job = event.get("CodePipeline.job")
        if job:
            for artifacts in job["data"]["inputArtifacts"]:
                if artifacts["name"] == "BuildArtifact":
                    location = artifacts["location"]["s3Location"]
        
        print "Building react-redux-tutorial from " + str(location)            
        s3 = boto3.resource('s3')
        output_bucket = s3.Bucket('react-redux-tutorial.chaoshamster.com')
        build_bucket = s3.Bucket(location["bucketName"])
        
        zip = StringIO.StringIO()
        build_bucket.download_fileobj(location["objectKey"], zip)
        
        with zipfile.ZipFile(zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                mmtype = mimetypes.guess_type(nm)[0]
                mmtype = mmtype if mmtype else "application/octet-stream"
                output_bucket.upload_fileobj(obj, nm, ExtraArgs={'ContentType': mmtype})
                output_bucket.Object(nm).Acl().put(ACL='public-read')
        
        print "Job done!"
        topic.publish(Subject="React-redux-tutorial Deployed", Message="React-redux-tutorial Deployed deployed successfully!")
        
        if job:
            codepipeline = boto3.client('codepipeline')
            codepipeline.put_job_success_result(jobId=job["id"])
    except:
        topic.publish(Subject="React-redux-tutorial Deployed Deploy Failed", 
                Message="React-redux-tutorial Deployed was not deployed successfully!")
        raise
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
